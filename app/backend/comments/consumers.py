# import asyncio - Can this be removed?
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Comment
from .serializers import CommentSerializer
from articles.models import Article


class CommentConsumer(AsyncWebsocketConsumer):
    """CommentConsumer."""

    async def connect(self):
        self.article = None
        self.article_slug = self.scope['url_route']['kwargs']['slug']

        await self.channel_layer.group_add(
            self.article_slug,
            self.channel_name
        )

        await self.article_exists(self.article_slug)

        await self.accept()

        print('Connection accepted.')

    async def disconnect(self, close_code):
        self.channel_layer.group_discard(
            self.article_slug,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        parent = text_data_json['parent']
        author = text_data_json['author']
        content = text_data_json['content']
        reply_level = text_data_json['reply_level']

        await self.channel_layer.group_send(
            self.article_slug,
            {
                'type': 'comment',
                'parent': parent,
                'author': author,
                'content': content,
                'reply_level': reply_level
            }
        )

    async def comment(self, event):
        parent = event['parent']
        author = event['author']
        content = event['content']
        reply_level = event['reply_level']

        # new_comment = await self.save_comment(parent, author, content, reply_level)

        await self.send(
            text_data=json.dumps({
                'parent': new_comment.parent,
                'author': new_comment.author,
                'content': new_comment.content,
                'reply_level': new_comment.reply_level
            })
        )

    @database_sync_to_async
    def save_comment(self, author, content):
        article = self.article

        comment = Comment(
            article=article,
            parent=parent,
            author=author,
            content=content,
            reply_level=reply_level
        )
        comment.save()
        return comment

    @database_sync_to_async
    def article_exists(self, slug):
        exists = Article.objects.filter(slug=self.article_slug).exists()
        if exists:
           self.article = Article.objects.filter(slug=slug).first()
