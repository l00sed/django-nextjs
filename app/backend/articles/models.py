from django.db import models
from django.template.defaultfilters import slugify
from taggit.managers import TaggableManager


def get_upload_path(instance, filename):
    return "uploads/{}/{}/{}".format(
        instance.content_type,
        instance.slug,
        filename
    )


class Article(models.Model):
    """Article."""
    CONTENT_TYPES = (
        ('blog', 'Blog Post'),
        ('page', 'Page'),
    )
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    description = models.CharField(max_length=1024)
    slug = models.SlugField(max_length=255)
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=False)
    updated_at = models.DateTimeField(auto_now=False)
    featured_image = models.ImageField(
        upload_to=get_upload_path,
        height_field=None,
        width_field=None
    )
    image_alt = models.CharField(max_length=200)
    content = models.TextField()
    content_type = models.CharField(
        max_length=12,
        choices=CONTENT_TYPES,
        default='blog'
    )
    tags = TaggableManager()

    class Meta:
        ordering = ('-created_at', )

    def __str__(self):
        return str(self.title)

    def get_absolute_url(self):
        return f"/{self.slug}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)


class Subscriber(models.Model):
    """Subscriber."""

    article = models.ForeignKey(to=Article, on_delete=models.CASCADE)
    email = models.EmailField(max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at', )

    def __str__(self):
        return str(self.email)
