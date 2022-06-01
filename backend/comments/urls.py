from django.urls import path
from .views import CommentsAPIView, CommentsByArticleAPIView, CommentByIDAPIView, CommentSubmitAPIView

urlpatterns = [
    path('comments', CommentsAPIView.as_view(), name='comments'),
    path('comments/<str:slug>',
         CommentsByArticleAPIView.as_view(), name='comments'),
    path('comment/<int:cid>', CommentByIDAPIView.as_view(), name='comments'),
    path('comment/submit', CommentSubmitAPIView.as_view(), name='comments'),
]
