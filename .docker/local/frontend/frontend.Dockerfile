FROM node:20.4-bookworm-slim

# UPDATES =========================================
# Update debian packages
RUN apt-get update -y
RUN set -o vi

# Update NPM to latest version
RUN npm i -g npm@latest

# Create frontend user
RUN groupadd -r -g ${GID} frontend
RUN useradd -r -M -u ${UID} -g ${GID} user__frontend
# Own the user directory
RUN mkdir -p /home/user__frontend
RUN chown -R ${UID}:${GID} /home/user__frontend

# ENVIRONMENT VARIABLES ===========================
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

# Disable NEXT.js telemetry 😡
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV development

# Copy application code to container
COPY --chown=${UID}:${GID} app/frontend /var/www/app/frontend
# Copy entrypoint script (local) to container
COPY --chown=${UID}:${GID} local /var/www/app

# Set Node working directory
WORKDIR /var/www/app/frontend

USER user__frontend

RUN mkdir -p /var/www/app/frontend/.next
RUN chown -R ${UID}:${GID} /var/www/app/frontend/.next

RUN npm i
