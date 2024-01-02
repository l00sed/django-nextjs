"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

# Fetch Django ASGI application early to ensure AppRegistry is populated
# before importing consumers and websockets urlpatterns so that the ORM
# models are imported.

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")

django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter
from channels.routing import URLRouter

from backend.urls import websocket_urlpatterns

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": URLRouter(websocket_urlpatterns),
    },
)
