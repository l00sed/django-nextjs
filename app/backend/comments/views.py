import json
from rest_framework import generics, response, status
from django.http import HttpResponse
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
        article_exists = Article.objects.filter(slug=slug).exists()
        if article_exists:
            article = Article.objects.filter(slug=slug).first().id
            # ...see if it has comments
            comment_query_set = (
                Comment.objects.filter(article=article)
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
            f'({slug}) '
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
                    # Set the cookie so that the same IP
                    # can't upvote the same comment again
                    # (or until cookies are cleared)
                    res = response.Response('Updated upvotes count')
                    res.set_cookie(
                        f"{cid}-upvote-{ip}",
                        samesite='Strict',
                        secure=True
                    )
                    return res
                else:
                    return response.Response(
                        f'ERROR: No comment with id ({cid}) found'
                    )
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
                    # Set the cookie so that the same IP
                    # can't downvote the same comment again
                    # (or until cookies are cleared)
                    res = response.Response('Updated downvotes count')
                    res.set_cookie(
                        f"{cid}-downvote-{ip}",
                        samesite='Strict',
                        secure=True
                    )
                    return res
                else:
                    return response.Response(
                        f'ERROR: No comment with id ({cid}) found'
                    )
            else:
                return response.Response('ERROR: Request type not accepted')
        else:
            return response.Response(
                'ERROR: IP already downvoted this comment'
            )


class ParentCommentsByArticleAPIView(generics.GenericAPIView):
    """ParentCommentsByArticleAPIView."""

    serializer_class = CommentSerializer

    def get(self, request, slug):
        """get.
        :param request:
        :param slug:
        """

        article_exists = Article.objects.filter(slug=slug).exists()
        if article_exists:
            article = Article.objects.filter(slug=slug).first().id
            query_set = Comment.objects.filter(
                article=article,
                pid=0
            ).order_by('cid') \
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

    def error_to_dict(self, error):
        error_dict = {
            "type": error.__class__.__name__,
            "label": error.label,
            "help_text": error.help_text,
            "initial_value": error.initial,
        }

        # Conditional errors
        if hasattr(error, 'min_length'):
            error_dict['min_length'] = error.min_length
        if hasattr(error, 'max_length'):
            error_dict['max_length'] = error.max_length
        if hasattr(error, 'widget_type'):
            error_dict['widget_type'] = error.widget_type
        if hasattr(error, 'hidden'):
            error_dict['hidden'] = error.widget.is_hidden
        if hasattr(error, 'required'):
            error_dict['required'] = error.widget.is_required

        return error_dict

    def field_to_dict(self, field):
        field_dict = {
            "type": field.__class__.__name__,
            "label": field.label,
            "help_text": field.help_text,
            "initial_value": field.initial,
        }

        # Conditional fields
        if hasattr(field, 'min_length'):
            field_dict['min_length'] = field.min_length
        if hasattr(field, 'max_length'):
            field_dict['max_length'] = field.max_length
        if hasattr(field, 'widget'):
            field_dict['widget_name'] = field.widget.__class__.__name__
            if hasattr(field.widget, 'attrs'):
                if 'placeholder' in field.widget.attrs:
                    if len(field.widget.attrs['placeholder']):
                        field_dict['placeholder'] = \
                            field.widget.attrs['placeholder']
                if 'cols' in field.widget.attrs:
                    field_dict['cols'] = field.widget.attrs['cols']
                if 'rows' in field.widget.attrs:
                    field_dict['rows'] = field.widget.attrs['rows']
        if hasattr(field, 'hidden'):
            field_dict['hidden'] = field.widget.is_hidden
        if hasattr(field, 'required'):
            field_dict['required'] = field.widget.is_required

        return field_dict

    def form_to_json(self, form):
        form_data = {}
        form_data["name"] = form.name

        if hasattr(form, 'is_bound'):
            form_data["is_bound"] = form.is_bound

        if hasattr(form, 'initial'):
            form_data["initial"] = form.initial

        if hasattr(form, 'fields'):
            form_data["fields"] = {}
            for name, field in form.fields.items():
                form_data["fields"][name] = \
                    self.field_to_dict(field)

        if hasattr(form, 'non_field_errors'):
            form_data["non_field_errors"] = []
            for error in form.non_field_errors():
                form_data["non_field_errors"].append(
                    self.error_to_dict(error)
                )

        if hasattr(form, 'errors'):
            form_data["errors"] = []
            for error in form.errors:
                form_data["errors"].append(
                    self.error_to_dict(error)
                )

        return json.dumps(form_data)

    def json_form(self, slug, data={}):
        # If empty data dict...
        if not data:
            if Article.objects.filter(slug=slug).exists():
                article = Article.objects.filter(slug=slug).first().id
                form = CommentForm(initial={"article": article})
                form_json = self.form_to_json(form)
                print('empty form')
                return HttpResponse(form_json, content_type="application/json")
            else:
                print('error')
                return response.Response(
                    f'ERROR: Article ({slug}) could not be found.'
                )
        # If data is supplied
        form = CommentForm(initial=data)
        form_json = self.form_to_json(form)
        return HttpResponse(form_json, content_type="application/json")

    def post(self, request, slug):
        """post.
        :param request:
        """
        # Get an unbound form if no data is present
        if not hasattr(request.data, "parent") and \
           not hasattr(request.data, "author") and \
           not hasattr(request.data, "content") and \
           not hasattr(request.data, "article") and \
           not hasattr(request.data, "reply_level"):
            return self.json_form(slug)
        # Set form with partial data
        else:
            COMMENT_DATA_READY = True
            form = CommentForm(request.data)
            form_dataset = {
                "parent": None,
                "author": None,
                "content": None,
                "article": None,
                "reply_level": None
            }

            if form.data["parent"]:
                parent_exists = Comment.objects.filter(
                    cid=int(form.data["parent"])
                ).exists()
                if parent_exists:
                    parent = Comment.objects.filter(
                        cid=int(form.data["parent"])
                    ).first().id
                    form_dataset["parent"] = parent
            if form.data["author"]:
                form_dataset["author"] = form.data["author"]
            if form.data["content"]:
                form_dataset["content"] = form.data["content"]
            if form.data["article"]:
                article_exists = Article.objects.filter(
                    id=int(form.data["article"])
                ).exists()
                if article_exists:
                    form_dataset["article"] = Article.objects.filter(
                        id=int(form.data['article'])
                    ).first().id
            if form.data["reply_level"]:
                form_dataset["reply_level"] = form.data["reply_level"]

            if form.is_valid():
                for key in form_dataset.keys():
                    if form_dataset[key] is None:
                        COMMENT_DATA_READY = False

                if COMMENT_DATA_READY:
                    comment = Comment(
                        parent=form_dataset["parent"],
                        author=form_dataset["author"],
                        content=form_dataset["content"],
                        article=form_dataset["article"],
                        reply_level=form_dataset["reply_level"]
                    )
                    comment.save()
                    # Reset form to empty state
                    return self.json_form(slug)
                else:
                    # Send valid form with errors
                    return self.json_form(slug, form_dataset)
            else:
                # Send valid form with errors
                return self.json_form(slug, form_dataset)
