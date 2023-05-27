from django.urls import path
from .views import (
    CommentsAPIView,
    CommentsByArticleAPIView,
    ParentCommentsByArticleAPIView,
    CommentsByPIDAPIView,
    CommentByIDAPIView,
    CommentSubmitAPIView,
    CommentFormAPIView
)

urlpatterns = [
    path(
        'comments',
        CommentsAPIView.as_view(),
        name='comments'
    ),
    path(
        'comments/<str:slug>',
        CommentsByArticleAPIView.as_view(),
        name='comments'
     ),
    path(
        'comments/<str:slug>/parents',
        ParentCommentsByArticleAPIView.as_view(),
        name='comments'
    ),
    path(
        'comment/<int:cid>',
        CommentByIDAPIView.as_view(),
        name='comments'
    ),
    path(
        'comment/pid/<int:cid>',
        CommentsByPIDAPIView.as_view(),
        name='comments'
    ),
    path(
        'comment/submit',
        CommentSubmitAPIView.as_view(),
        name='comments'
    ),
    path(
        'comment/<str:slug>/form',
        CommentFormAPIView.as_view(),
        name='comments'
    )
]
