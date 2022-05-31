from django.contrib import admin
from .models import Comment


class CommentModelAdmin(admin.ModelAdmin):
    list_display = ('cid', 'pid', 'article', 'author', 'created_at', 'content')
    search_fields = ('cid', 'pid', 'article', 'author', 'created_at')
    list_per_page = 20


admin.site.register(Comment, CommentModelAdmin)
