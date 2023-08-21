from rest_framework import serializers
from .models import Article, Subscriber
from taggit.serializers import (
    TagListSerializerField,
    TaggitSerializer
)


class ArticleSerializer(TaggitSerializer, serializers.ModelSerializer):

    tags = TagListSerializerField()

    class Meta:
        model = Article
        fields = "__all__"


class SubscriberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscriber
        fields = "__all__"
