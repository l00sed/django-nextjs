FROM node:20.4-bookworm-slim

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

# Update NPM to latest version
RUN npm i -g npm@latest

# Copy application code to container
COPY app/frontend /var/www/app/frontend
# Copy entrypoint script (local) to container
COPY local /var/www/app
# Set Node working directory
WORKDIR /var/www/app/frontend

# Install application node modules
RUN npm i
