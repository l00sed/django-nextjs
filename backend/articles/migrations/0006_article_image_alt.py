# Generated by Django 4.0.4 on 2022-05-29 05:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0005_article_featured_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='image_alt',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
    ]
