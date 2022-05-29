# Django + NEXT.js

Following along with this [tutorial](https://www.youtube.com/watch?v=zS3vKMbsUfY).

## Project Setup

### Virtual Environment

`conda create -n django-nextjs`
`conda activate django-nextjs`

### Install Django

`pip install django django-admin`
`django-admin startproject backend`
`./manage.py createsuperuser`

### Install Next.js

`npx create-next-app`

### ~/.pylintrc

I'm using neovim with ALE (a plugin that organizes all your linters). This is my configuration in `~/.vimrc`:

```
let g:ale_python_pylint_options = "--rcfile ~/.pylintrc"
let g:ale_python_pylint = '~/.local/bin/pylint'
```

Something I need to work on is pylint setup.
I currently have `~/.pylintrc`:

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
- look into `autoenv`
- use `.env` more effectively
- Next.js uses `.env.local` and `.env.production`

## TinyMCE (WYSIWYG)

Use in-browser spellcheck by adding the following to your TinyMCE settings in `settings.py`:

```
  "gecko_spellcheck": True,
  "browser_spellcheck": True,
```
