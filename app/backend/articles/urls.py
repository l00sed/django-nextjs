from django.urls import path
from .views import (
    ArticleListAPIView,
    ArticleDetailAPIView,
    SubscribeToArticleAPIView
)

urlpatterns = [
    path(
        'api/articles',
        ArticleListAPIView.as_view(),
        name='articles'
    ),
    path(
        'api/articles/<str:slug>',
        ArticleDetailAPIView.as_view(),
        name='articles'
    ),
    path(
        'subscribers',
        SubscribeToArticleAPIView.as_view(),
        name='articles'
    ),
]
