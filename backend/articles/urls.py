from django.urls import path
from .views import ArticleListAPIView, ArticleDetailAPIView, SubscribeToArticleAPIView

urlpatterns = [
    path('articles', ArticleListAPIView.as_view(), name='articles'),
    path('articles/<str:slug>', ArticleDetailAPIView.as_view(), name='articles'),
    path('subscribers', SubscribeToArticleAPIView.as_view(), name='articles'),
]
