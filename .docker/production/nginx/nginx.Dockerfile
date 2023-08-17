FROM nginx:1.25-bookworm

# Get build arguments
ARG USER_ID
ARG GROUP_ID

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

# Re-create frontend "nginx" user with host's UID/GID
RUN userdel -f nginx || echo 'User "nginx" does not exist.'
RUN if getent group nginx;then groupdel nginx;fi
RUN groupadd -g ${GROUP_ID} nginx || echo 'Group "nginx" already exists.'
RUN useradd -l -u ${USER_ID} -g nginx nginx || echo 'User "nginx" already exists.'
RUN install -d -m 0755 -o nginx -g nginx /home/nginx || echo 'User directory already exists for "nginx".'

WORKDIR /etc/nginx

RUN mkdir -p certs

COPY --chown=${USER_ID}:${GROUP_ID} .docker/local/nginx/certs certs
COPY --chown=${USER_ID}:${GROUP_ID} .docker/local/nginx/conf.d conf.d
COPY --chown=${USER_ID}:${GROUP_ID} .docker/local/nginx/nginx.conf .

RUN chown -R nginx:nginx /etc/nginx/certs
RUN chown -R nginx:nginx /etc/nginx/conf.d
RUN chown -R nginx:nginx /etc/nginx/nginx.conf
RUN chown -R nginx:nginx /var/cache/nginx
RUN chown -R nginx:nginx /var/log/nginx
# Own process file
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid

USER nginx
