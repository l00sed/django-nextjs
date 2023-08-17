FROM nginx:1.25-bookworm

# ENVIRONMENT VARIABLES ===========================
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

# UPDATES =========================================
# Update debian packages
RUN apt-get update -y

# Install SSL packages
RUN apt-get install -y openssl

# Install Neovim for file editing and alias vim -> nvim
RUN apt-get install -y neovim
RUN alias vim=nvim
# Use vi-mode for shell navigation
RUN set -o vi

WORKDIR /etc/nginx
