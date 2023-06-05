from rest_framework import generics, response, status
from django.shortcuts import render
from django.http import HttpResponseRedirect
from articles.models import Article
from .serializers import CommentFormSerializer, CommentSerializer
from .models import Comment
from .forms import CommentForm


class CommentsAPIView(generics.ListAPIView):
    """CommentsAPIView."""

    serializer_class = CommentSerializer

    def get_queryset(self):
        """get_queryset."""
        return Comment.objects.all()


class CommentsByArticleAPIView(generics.GenericAPIView):
    """CommentsByArticleAPIView."""

    serializer_class = CommentSerializer

    def get(self, request, slug):
        """get.
        :param request:
        :param slug:
        """

        article = Article.objects.filter(slug=slug).first()

        if article:
            comment_query_set = (
                Comment.objects
                .filter(article=article.id)
                .order_siblings_by("cid")
            )

            if comment_query_set:
                serializer = CommentSerializer(comment_query_set, many=True)
                return response.Response(serializer.data)

        return response.Response('Not found', status=status.HTTP_404_NOT_FOUND)


class CommentUpvoteAPIView(generics.GenericAPIView):
    """Upvote comment."""
    def put(self, request, cid):
        """put.
        :param request:
        """

        comment = Comment.objects.filter(cid=cid).first()
        print(comment.upvotes)
        comment.upvotes = comment.upvotes + 1
        comment.save()

        return response.Response('Updated upvotes count')


class CommentDownvoteAPIView(generics.GenericAPIView):
    """Downvote comment."""
    def put(self, request, cid):
        """put.
        :param request:
        """

        comment = Comment.objects.filter(cid=cid).first()
        print(comment.downvotes)
        comment.downvotes = comment.downvotes + 1
        comment.save()

        return response.Response('Updated downvotes count')


class ParentCommentsByArticleAPIView(generics.GenericAPIView):
    """ParentCommentsByArticleAPIView."""

    serializer_class = CommentSerializer

    def get(self, request, slug):
        """get.
        :param request:
        :param slug:
        """

        article = Article.objects.filter(slug=slug).first()

        if article:
            query_set = Comment.objects.filter(article=article.id, pid=0) \
                .order_by('cid') \
                .reverse()

            if query_set:
                serializer = CommentSerializer(query_set, many=True)
                return response.Response(serializer.data)

        return response.Response('Not found', status=status.HTTP_404_NOT_FOUND)


class CommentsByPIDAPIView(generics.GenericAPIView):
    """CommentsByPIDAPIView."""

    serializer_class = CommentSerializer

    def get(self, request, cid):
        """get.
        :param request:
        :param pid:
        """

        query_set = Comment.objects.filter(pid=cid) \
            .order_by('cid') \
            .reverse()

        if query_set:
            serializer = CommentSerializer(query_set, many=True)
            return response.Response(serializer.data)

        return response.Response('Not found', status=status.HTTP_404_NOT_FOUND)


class CommentByIDAPIView(generics.GenericAPIView):
    """CommentByIDAPIView."""

    serializer_class = CommentSerializer

    def get(self, request, cid):
        """get.
        :param request:
        :param cid:
        """
        query_set = Comment.objects.filter(cid=cid).first()

        if query_set:
            serializer = CommentSerializer(query_set, many=True)
            return response.Response(serializer.data)

        return response.Response('Not found', status=status.HTTP_404_NOT_FOUND)


class CommentSubmitAPIView(generics.CreateAPIView):
    """CommentSubmitAPIView."""

    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.all()


class CommentFormAPIView(generics.GenericAPIView):
    """Get the comment form template from Django."""

    serializer_class = CommentFormSerializer

    def get(self, request, slug):
        """get.
        :param request:
        """
        article = Article.objects.filter(slug=slug).first().id
        form = CommentForm(data={'article': article})
        return render(request, 'backend/form.html', {'form': form})

    def post(self, request):
        """post.
        :param request:
        """
        form = CommentForm(request.POST)
        if form.is_valid():
            return HttpResponseRedirect(request.path_info)
