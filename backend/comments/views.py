from rest_framework import generics, response, status
from articles.models import Article
from .serializers import CommentSerializer
from .models import Comment


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
            query_set = Comment.objects.filter(article=article.id)

            if query_set:
                serializer = CommentSerializer(query_set, many=True)
                return response.Response(serializer.data)

        return response.Response('Not found', status=status.HTTP_404_NOT_FOUND)


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
