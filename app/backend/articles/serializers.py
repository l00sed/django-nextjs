from rest_framework import serializers
from .models import Article, Subscriber
from taggit.models import Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')


class ArticleSerializer(TagSerializer, serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Article
        fields = "__all__"


class ArticleLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['likes']


class SubscriberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscriber
        fields = "__all__"
