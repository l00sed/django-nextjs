from django.db import models


class LQIP(models.Model):
    """Low-quality image placeholders."""
    image_filepath = models.FilePathField(
        default=None
    )
    base64 = models.CharField(
        max_length=100000
    )
