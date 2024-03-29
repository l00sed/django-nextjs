from django.contrib import admin
from .models import Article, Subscriber

# Register your models here.


class ArticleModelAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'slug',
        'description',
        'created_at',
        'updated_at',
        'content_type'
    )
    list_filter = ['content_type']
    search_fields = ('id', 'title', 'description')
    list_per_page = 20


class SubscriberModelAdmin(admin.ModelAdmin):
    list_display = ('email', 'article', 'created_at')
    search_fields = ('email', 'article__title')
    list_per_page = 20


admin.site.register(Article, ArticleModelAdmin)
admin.site.register(Subscriber, SubscriberModelAdmin)
