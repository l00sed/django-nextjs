from rest_framework import generics, response, status
from django.shortcuts import render
from django.http import HttpResponseRedirect
from articles.models import Article
from backend.tools import get_client_ip
from .serializers import (
    CommentFormSerializer,
    CommentSerializer,
    CommentUpvoteSerializer,
    CommentDownvoteSerializer
)
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

        # Get article object with the API slug
        article = Article.objects.filter(slug=slug).first()

        # If article exists...
        if article:
            # ...see if it has comments
            comment_query_set = (
                Comment.objects
                .filter(article=article.id)
                .order_siblings_by("cid")
            )

            # If comments, send them back in the response
            if comment_query_set:
                serializer = CommentSerializer(comment_query_set, many=True)
                return response.Response(serializer.data)
            # If not, send an empty JSON
            else:
                return response.Response({})

        # No article with the given slug
        return response.Response(
            'Article could not be retrieved from the API with the given slug: '
            f'(  { slug }  ) '
            'Article not found.',
            status=status.HTTP_404_NOT_FOUND
        )


class CommentUpvoteAPIView(generics.UpdateAPIView):
    """Upvote comment."""
    serializer_class = CommentUpvoteSerializer

    def put(self, request, cid):
        """put.
        :param request:
        """
        # Get requester's IP address
        ip = get_client_ip(request)
        # Set a unique cookie for this article and the IP address
        cookie = request.COOKIES.get(f"{cid}-upvote-{ip}")
        if cookie is None:
            # Cookie is not set and request is PUT, update article likes count
            if request.method == "PUT":
                comment = Comment.objects.filter(cid=cid).first()
                if comment:
                    # print(comment.upvotes)
                    comment.upvotes = comment.upvotes + 1
                    # print(comment.upvotes)
                    comment.save()
                    # Set the cookie so that the same IP can't upvote the same comment again
                    # (or until cookies are cleared)
                    res = response.Response('Updated upvotes count')
                    res.set_cookie(
                        f"{cid}-upvote-{ip}",
                        samesite='Strict',
                        secure=True
                    )
                    return res
                else:
                    return response.Response(f'ERROR: No comment with id ({cid}) found')
            else:
                return response.Response('ERROR: Request type not accepted')
        else:
            return response.Response('ERROR: IP already upvoted this comment.')


class CommentDownvoteAPIView(generics.UpdateAPIView):
    """Downvote comment."""
    serializer_class = CommentDownvoteSerializer

    def put(self, request, cid):
        """put.
        :param request:
        """
        # Get requester's IP address
        ip = get_client_ip(request)
        # Set a unique cookie for this article and the IP address
        cookie = request.COOKIES.get(f"{cid}-downvote-{ip}")
        if cookie is None:
            # Cookie is not set and request is PUT, update article likes count
            if request.method == "PUT":
                comment = Comment.objects.filter(cid=cid).first()
                if comment:
                    # print(comment.downvotes)
                    comment.downvotes = comment.downvotes + 1
                    # print(comment.downvotes)
                    comment.save()
                    # Set the cookie so that the same IP can't downvote the same comment again
                    # (or until cookies are cleared)
                    res = response.Response('Updated downvotes count')
                    res.set_cookie(
                        f"{cid}-downvote-{ip}",
                        samesite='Strict',
                        secure=True
                    )
                    return res
                else:
                    return response.Response(f'ERROR: No comment with id ({cid}) found')
            else:
                return response.Response('ERROR: Request type not accepted')
        else:
            return response.Response('ERROR: IP already downvoted this comment')


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


class CommentFormAPIView(generics.GenericAPIView):
    """Get the comment form template from Django."""

    serializer_class = CommentFormSerializer

    def get(self, request, slug, data={}):
        """get.
        :param request:
        """
        article = Article.objects.filter(slug=slug).first().id
        data['article'] = article
        form = CommentForm(data=data)
        return render(request, 'backend/form.html', {'form': form})

    def post(self, request, slug):
        """post.
        :param request:
        """
        form = CommentForm(request.data)
        # NOTE: For debugging:
        # print('form.data')
        # print(form.data)
        # print('is_bound')
        # print(form.is_bound)

        if form.is_valid():
            # print('Valid!')
            parent = None
            if form.data['parent']:
                parent = Comment.objects.get(cid=int(form.data['parent']))
                print(parent)
            author = form.data['author']
            content = form.data['content']
            article = Article.objects.get(id=int(form.data['article']))
            reply_level = form.data['reply_level']

            comment = Comment(
                parent=parent,
                author=author,
                content=content,
                article=article,
                reply_level=reply_level
            )
            comment.save()
            return HttpResponseRedirect(request.path_info)
        else:
            # print('Invalid!')
            # print(form.errors)
            return render(request, 'backend/form.html', {'form': form})
