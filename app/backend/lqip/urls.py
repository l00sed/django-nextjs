from django.urls import path
from .views import (
    LQIPAPIView
)

urlpatterns = [
    path(
        'lqip/<path:filepath>',
        LQIPAPIView.as_view(),
        name='lqip'
    ),
]
