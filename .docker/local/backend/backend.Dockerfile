FROM python:3.11-slim-bookworm

# UPDATES =========================================
# Update debian packages
RUN apt-get update -y

# Use vi-mode for shell navigation
RUN set -o vi

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

# BACKEND =========================================
# Run backend as "user__backend" instead of root
RUN groupadd -r -g ${GID} backend
RUN useradd -r -M -u ${UID} -g ${GID} user__backend

# Copy application code to container
COPY --chown=${UID}:${GID} app/backend /var/www/app/backend
# Copy the entrypoint script (local) to the container
COPY --chown=${UID}:${GID} local /var/www/app

# Set Python working directory
WORKDIR /var/www/app/backend

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
