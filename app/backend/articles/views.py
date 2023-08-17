from rest_framework import generics, response, status
from .models import Article, Subscriber
from .serializers import ArticleSerializer, SubscriberSerializer


# Create your views here.
class ArticleListAPIView(generics.ListAPIView):
    """ArticleListAPIView."""

    serializer_class = ArticleSerializer

    def get_queryset(self):
        """get_queryset."""
        return Article.objects.filter(content_type='blog')


class ArticleDetailAPIView(generics.GenericAPIView):
    """ArticleDetailAPIView."""

    serializer_class = ArticleSerializer

    def get(self, request, slug):
        """get.
        :param slug:
        """

        query_set = Article.objects.filter(slug=slug).first()

        if query_set:
            return response.Response(self.serializer_class(query_set).data)

        return response.Response('Not found', status=status.HTTP_404_NOT_FOUND)


class SubscribeToArticleAPIView(generics.CreateAPIView):
    """SubscribeToArticleAPIView."""

    serializer_class = SubscriberSerializer

    def get_queryset(self):
        return Subscriber.objects.all()
