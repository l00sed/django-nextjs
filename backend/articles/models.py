from django.db import models
from tinymce import models as tinymce_models
from django.template.defaultfilters import slugify


def get_upload_path(instance, filename):
    return "uploads/articles/{}/{}".format(instance.slug, filename)


class Article(models.Model):
    """Article."""
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    description = tinymce_models.HTMLField()
    slug = models.SlugField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    featured_image = models.ImageField(
        upload_to=get_upload_path, height_field=None, width_field=None)
    image_alt = models.CharField(max_length=200)
    content = tinymce_models.HTMLField()

    class Meta:
        ordering = ('-created_at', )

    def __str__(self):
        return str(self.title)

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
