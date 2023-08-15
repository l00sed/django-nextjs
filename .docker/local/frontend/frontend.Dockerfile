FROM node:20.4-bookworm-slim AS deps

WORKDIR /home/node

COPY app/frontend/package.json ./
COPY app/frontend/package-lock.json ./

# Update NPM to latest version
RUN npm i -g npm@latest
# Install application node modules
RUN npm i

FROM node:20.4-bookworm-slim AS builder

WORKDIR /home/node
COPY --from=deps /home/node/node_modules ./node_modules
COPY app/frontend .

FROM node:20.4-bookworm-slim AS runner

WORKDIR /home/node

# ENVIRONMENT VARIABLES ===========================
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

ENV NODE_ENV development
# Disable NEXT.js telemetry 😡
ENV NEXT_TELEMETRY_DISABLED 1

# Ensure headless Debian (for apt installation)
ENV DEBIAN_FRONTEND noninteractive

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
RUN groupadd -g 1001 node || echo 'Group "node" already exists.'
RUN useradd -l -u 1001 -g node node || echo 'User "node" already exists.'
RUN install -d -m 0755 -o node -g node /home/node || echo 'User directory already exists for "node".'

# Copy application code to container
COPY --from=builder --chown=1001:1001 /home/node .
#COPY --from=builder --chown=1001:1001 /home/node/.next ./.next
COPY --from=builder /home/node/node_modules ./node_modules
COPY --from=builder /home/node/package.json ./package.json

RUN chown --changes --silent --no-dereference --recursive 1001:1001 /home/node
RUN mkdir -p /home/node/.npm
RUN chown --changes --silent --no-dereference --recursive 1001:1001 /home/node/.npm

# Switch to the "node" user
USER node
