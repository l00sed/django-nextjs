FROM python:3.11-slim-bookworm

# Get build arguments
ARG USER_ID
ARG GROUP_ID

# ENVIRONMENT VARIABLES ===========================
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
# Get unbuffered Python log out to STDOUT
ENV PYTHONUNBUFFERED 1
# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1
# Ensure headless Debian
ENV DEBIAN_FRONTEND noninteractive
# Ignore warnings about running pip as root
ENV PIP_ROOT_USER_ACTION ignore

# UPDATES =========================================
# Update debian packages
RUN apt-get update -y
# Install Neovim for file editing and alias vim -> nvim
RUN apt-get install -y neovim
RUN alias vim=nvim
# Use vi-mode for shell navigation
RUN set -o vi

# BACKEND =========================================
# Run backend as "app__user" instead of root
RUN userdel -f user__backend || echo 'User "user__backend" does not exist.'
RUN if getent group user__backend;then groupdel user__backend;fi
RUN groupadd -g ${GROUP_ID} user__backend || echo 'Group "user__backend" already exists.'
RUN useradd -l -u ${USER_ID} -g user__backend user__backend || echo 'User "user__backend" already exists.'
RUN install -d -m 0755 -o user__backend -g user__backend /home/user__backend || echo 'User directory already exists for "user__backend".'
RUN mkdir -p /home/user__backend
RUN chown --changes --silent --no-dereference --recursive ${USER_ID}:${GROUP_ID} /home/user__backend

# Copy mdx
COPY --chown=${USER_ID}:${GROUP_ID} app/frontend/src/mdx /app/frontend/src/mdx
# Copy application code to container
COPY --chown=${USER_ID}:${GROUP_ID} app/backend /app/backend
# Copy the entrypoint script (local) to the container
COPY --chown=${USER_ID}:${GROUP_ID} local /

# Set Python working directory
WORKDIR /app/backend

# Update pip before installing virtualenv
RUN pip install --upgrade pip
# Install virtual environment handler
RUN pip install virtualenv

# Create a virtual environment in the current directory.
RUN python -m venv .
# Activate new VENV
RUN . ./bin/activate
# Upgrade pip (this time, for the virtual environment)
RUN pip install --upgrade pip
# Install pip requirements in virtual environment
RUN pip install -r pip/requirements.txt
# Migrate database tables
RUN python manage.py makemigrations
RUN python manage.py migrate
# Import pages
RUN python manage.py sync_local_mdx

USER user__backend
