FROM python:3.11-slim-bookworm

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

# Copy mdx
COPY app/frontend/src/mdx /app/frontend/src/mdx
# Copy application code to container
COPY app/backend .
# Copy the entrypoint script (loosed) to the container
COPY loosed /

# Install pip requirements in virtual environment
RUN pip install -r pip/requirements.txt
# Migrate database tables
RUN python manage.py makemigrations
RUN python manage.py migrate
# Import pages
RUN python manage.py sync_local_mdx
