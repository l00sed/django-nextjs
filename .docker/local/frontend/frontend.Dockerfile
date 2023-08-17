FROM node:20.4-bookworm-slim AS runner

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

WORKDIR /home/node

COPY app/frontend/package.json .
COPY app/frontend/package-lock.json .

# Update NPM to latest version
RUN npm i -g npm@latest
# Install application node modules
RUN npm i
