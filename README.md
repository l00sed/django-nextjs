# Loosed Blog Web Application

This application is setup to use Docker. It containerizes an Nginx image, a Python image, and a Node image. The Nginx image directs traffic from requests to either the backend (Python) or the frontend (Node.js).

The backend Python image is used to install and run a RESTful API from a Django server, with Gunicorn (WSGI) pumping out responses from the Python code. The frontend is Next.js (a React framework, framework) for fetching these API endpoints and displaying data.

## Project Setup

### Backend

#### Virtual Environment

This project is using [Conda](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html) to manage Python virtual environments. You can use any virtual environment handler, but this is recommended! Here, the `django-nextjs` repo is using Python version 3.10.4:

`conda create -n django-nextjs`

#### Python Packages

Django is included in the Python pip `requirements.txt` file (under `backend/pip/requirements.txt`), along with some other required Python packages.

To install these dependencies, first make sure your Python virtual environment is active. Using Conda:

`conda activate django-nextjs`

After you've enabled the virtual environment, you can use that version of Python to install packages with the pip package installer. Navigate into the `backend/` directory and run:

`pip install -r pip/requirements.txt`

We'll also have Python packages that we're using for development. Install those packages with:

`pip install -r pip/requirements-dev.txt`

Django uses the `django-admin` command to create a new project. The folder `backend` has already been created with the command:

`django-admin startproject backend`

This installs the "backend" Django app at `backend/backend/` and places a `manage.py` file in the root `backend/` folder. This file is the Python entrypoint for manipulating Django's object-relational mapping (ORM), creating new superusers, starting a development server, and providing other administrative functions.

Create a new superuser from the `backend/` directory:

`./manage.py createsuperuser`

#### Python Linting

I'm using the Neovim text-editor with a Python linter and the Pyright [language server protocol](https://microsoft.github.io/language-server-protocol/) to provide markdown hints, warnings, and errors. This project is using Pylint as a linter. This is currently configured in `~/.pylintrc`:

```
[MASTER]
load-plugins=pylint_django
generated-members=objects
django-settings-module=backend.settings
```

That's because I'm using "backend" as the name of my Django project structure:

```
/backend
- /articles
- /backend
- manage.py
/frontend
- /components
- /styles
README.md
```

So, I have to change this to whatever Django project I'm currently working on, which is annoying.
- [ ] look into `autoenv`
- [ ] use `.env` more effectively
- [ ] Next.js uses `.env.local` and `.env.production`

### Frontend

#### Next.js

Next.js requires Node.js to be installed. The recommended installation method is using [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm). I used NVM to install Node version 16.15.0.

With Node installed, the Next.js app could be installed with:

`npx create-next-app`

Since this command has already been run, you don't have to run it again. However, to install the requisite NPM packages, you must run:

`npm install`

Then, to run the frontend in development, use:

`npm run dev`
