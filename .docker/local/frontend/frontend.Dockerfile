FROM node:20.4-bookworm-slim

# UPDATES =========================================
# Update debian packages
RUN apt-get update -y

# Update NPM to latest version
RUN npm i -g npm@latest

# ENVIRONMENT VARIABLES ===========================
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

# Disable NEXT.js telemetry 😡
ENV NEXT_TELEMETRY_DISABLED 1
# Set node environment for .docker/local/
ENV NODE_ENV development

# Copy application code to container
COPY app/frontend /app/frontend
# Copy entrypoint script (local) to container
COPY local /

# Set Node working directory
WORKDIR /app/frontend

# Install node packages (from package.json)
RUN npm i
