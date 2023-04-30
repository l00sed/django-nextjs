from django.db import models


class Comment(models.Model):
    """Comment."""
    cid = models.AutoField(primary_key=True)
    parent = models.ForeignKey(
        'self',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='children'
    )
    author = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=255)
    article = models.ForeignKey('articles.Article', on_delete=models.CASCADE)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    reply_level = models.IntegerField(default=0)

    class Meta:
        ordering = ['cid', '-created_at']

    def __str__(self):
        return str(self.cid)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
