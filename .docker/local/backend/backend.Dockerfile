FROM python:3.11-slim-bookworm

# UPDATES =========================================
# Update debian packages
RUN apt-get update -y

# ENVIRONMENT VARIABLES ===========================
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

# Get unbuffered Python log out to STDOUT
ENV PYTHONUNBUFFERED 1
# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1
# Ignore warnings about running pip as root
ENV PIP_ROOT_USER_ACTION ignore

# Ensure headless Debian (for apt installation)
ENV DEBIAN_FRONTEND noninteractive

# BACKEND =========================================
# Run backend as "user__backend" instead of root
RUN groupadd -r application
RUN useradd -r -M -g application user__backend

# Copy application code to container
COPY --chown=user__backend:application app/backend /app/backend
# Copy the entrypoint script (local) to the container
COPY --chown=user__backend:application local /

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

# Enable makemigrations + migrate for production build
RUN python manage.py makemigrations
RUN python manage.py migrate
