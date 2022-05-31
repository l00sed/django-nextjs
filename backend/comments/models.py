from django.db import models


class Comment(models.Model):
    """Comment."""
    cid = models.AutoField(primary_key=True)
    pid = models.IntegerField(default=0)
    author = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=255)
    article = models.ForeignKey('articles.Article', on_delete=models.CASCADE)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)

    class Meta:
        ordering = ('-created_at', )

    def __str__(self):
        return str(self.content)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
