FROM python:3.11-slim-bookworm

# ENVIRONMENT VARIABLES ===========================

# Get unbuffered Python log out to STDOUT
ENV PYTHONUNBUFFERED 1
# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1
# Ensure headless Debian
ENV DEBIAN_FRONTEND noninteractive
# Ignore warnings about running pip as root
ENV PIP_ROOT_USER_ACTION ignore

# BACKEND =========================================

# Copy application code to container
COPY app/backend /app/backend
# Copy the entrypoint script to container
COPY local /

# Set Python working directory
WORKDIR /app/backend

# Update packages before installing VENV
RUN apt-get update -y
RUN apt-get install -y python3.11-venv

RUN python3.11 -m venv .
RUN . ./bin/activate

# Run before requirements.txt install for cache efficiency
RUN python3.11 -m pip install --upgrade pip

# Install pip requirements
RUN python3.11 -m pip install -r pip/requirements.txt

# WARN: Enable makemigrations + migrate for production build
# RUN python3.11 manage.py makemigrations
# RUN python3.11 manage.py migrate
