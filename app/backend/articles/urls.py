from django.urls import path
from .views import (
    ArticleListAPIView,
    ArticlesByTagAPIView,
    # ArticlesBySearchTermAPIView,
    ArticleDetailAPIView,
    ArticleLikesAPIView,
    SubscribeToArticleAPIView
)

urlpatterns = [
    path(
        'articles',
        ArticleListAPIView.as_view(),
        name='articles'
    ),
    path(
        'articles/tagged/<slug:slug>',
        ArticlesByTagAPIView.as_view(),
        name='articles'
    ),
    # path(
    #     'articles/search/<str:search>',
    #     ArticlesBySearchTermAPIView.as_view(),
    #     name='articles'
    # ),
    path(
        'articles/<slug:slug>',
        ArticleDetailAPIView.as_view(),
        name='articles'
    ),
    path(
        'articles/like/<slug:slug>',
        ArticleLikesAPIView.as_view(),
        name='articles'
    ),
    path(
        'subscribers',
        SubscribeToArticleAPIView.as_view(),
        name='articles'
    ),
]
