from rest_framework import generics, response, status
from .models import Article, Subscriber
from .serializers import (
    ArticleSerializer,
    SubscriberSerializer,
    ArticleLikesSerializer
)
from backend.tools import get_client_ip


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


class ArticleLikesAPIView(generics.UpdateAPIView):
    """Increment "like" count on an article."""
    serializer_class = ArticleLikesSerializer

    def put(self, request, slug):
        """put.
        :param request:
        """
        # Get requester's IP address
        ip = get_client_ip(request)
        # Set a unique cookie for this article and the IP address
        cookie = request.COOKIES.get(f"{slug}-like-{ip}")
        if cookie is None:
            # Cookie is not set and request is PUT, update article likes count
            if request.method == "PUT":
                article = Article.objects.filter(slug=slug).first()
                if article:
                    article.likes += 1
                    article.save()
                    # Set the cookie so that the same IP
                    # can't like the same article again
                    # (or until cookies are cleared)
                    res = response.Response('Updated article likes count')
                    res.set_cookie(
                        f"{slug}-like-{ip}",
                        samesite='Strict',
                        secure=True
                    )
                    return res
                else:
                    return response.Response(
                        f'ERROR: No article with slug ({slug}) found'
                    )
            else:
                return response.Response('ERROR: Request type not accepted')
        else:
            return response.Response('ERROR: IP already liked this article.')


class SubscribeToArticleAPIView(generics.CreateAPIView):
    """SubscribeToArticleAPIView."""

    serializer_class = SubscriberSerializer

    def get_queryset(self):
        return Subscriber.objects.all()