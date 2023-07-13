FROM node:20.4-bookworm-slim

# Copy application code to container
COPY app/frontend /app/frontend
# Copy entrypoint script to container
COPY local /

# Set Node working directory
WORKDIR /app/frontend

# Install node packages
RUN npm i
