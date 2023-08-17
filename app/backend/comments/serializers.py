from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class CommentFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class CommentUpvoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['upvotes']


class CommentDownvoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['downvotes']
