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


class ArticleSimpleSerializer(TagSerializer, serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Article
        fields = [
            'title',
            'author',
            'description',
            'slug',
            'created_at',
            'updated_at',
            'featured_image',
            'image_alt',
            'content_type',
            'tags'
        ]


class ArticleLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['likes']


class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = "__all__"
