from rest_framework import serializers
from .models import Comment
from .forms import CommentForm


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class CommentFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
