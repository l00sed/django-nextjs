FROM nginx:1.25-bookworm

# UPDATES =========================================
# Update debian packages
RUN apt-get update -y

# Install SSL packages
RUN apt-get install -y openssl

# ENVIRONMENT VARIABLES ===========================
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
