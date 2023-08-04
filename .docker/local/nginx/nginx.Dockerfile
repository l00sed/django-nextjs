FROM nginx:1.25-bookworm

# UPDATES =========================================
# Update debian packages
RUN apt-get update -y

# Use vi-mode for shell navigation
RUN set -o vi

# Install SSL packages
RUN apt-get install -y openssl

# ENVIRONMENT VARIABLES ===========================
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8