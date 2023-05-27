from django.db import models
from tree_queries.models import TreeNode
from tree_queries.query import TreeQuerySet


class Comment(TreeNode):
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
    content = models.CharField(max_length=2000)
    article = models.ForeignKey('articles.Article', on_delete=models.CASCADE)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    reply_level = models.IntegerField(default=0)
    approved = models.BooleanField(default=False)

    objects = TreeQuerySet.as_manager(with_tree_fields=True)

    class Meta:
        ordering = ['cid']

    def __str__(self):
        return str(self.cid)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
