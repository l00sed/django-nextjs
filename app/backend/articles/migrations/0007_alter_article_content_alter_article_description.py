# Generated by Django 4.0.4 on 2022-06-14 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0006_article_image_alt'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='content',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='article',
            name='description',
            field=models.CharField(max_length=1024),
        ),
    ]