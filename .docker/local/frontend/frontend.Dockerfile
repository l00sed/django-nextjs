FROM node:20.4-bookworm-slim

# Get build arguments
ARG USER_ID
ARG GROUP_ID

# ENVIRONMENT VARIABLES ===========================
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

# Disable NEXT.js telemetry 😡
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV development

# UPDATES =========================================
# Update debian packages
RUN apt-get update -y
# Install Neovim for file editing and alias vim -> nvim
RUN apt-get install -y neovim
RUN alias vim=nvim
# Use vi-mode for shell navigation
RUN set -o vi

# Re-create frontend "node" user with host's UID/GID
RUN userdel -f node || echo 'User "node" does not exist.'
RUN if getent group node;then groupdel node;fi
RUN groupadd -g ${GROUP_ID} node || echo 'Group "node" already exists.'
RUN useradd -l -u ${USER_ID} -g node node || echo 'User "node" already exists.'
RUN install -d -m 0755 -o node -g node /home/node || echo 'User directory already exists for "node".'
RUN mkdir -p /home/node
RUN chown --changes --silent --no-dereference --recursive ${USER_ID}:${GROUP_ID} /home/node

# Update NPM to latest version
RUN npm i -g npm@latest

# Copy application code to container
COPY --chown=${USER_ID}:${GROUP_ID} app/frontend /var/www/app/frontend
# Copy entrypoint script (local) to container
COPY --chown=${USER_ID}:${GROUP_ID} local /var/www/app
# Set Node working directory
WORKDIR /var/www/app/frontend

# Create the NextJS build dir
RUN mkdir -p /var/www/app/frontend/.next
RUN chown -R ${USER_ID}:${GROUP_ID} /var/www/app/frontend/.next

# Switch to the "node" user
USER node
# Install application node modules
RUN npm i
