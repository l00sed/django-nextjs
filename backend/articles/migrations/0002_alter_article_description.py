# Generated by Django 4.0.4 on 2022-05-26 02:55

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='description',
            field=tinymce.models.HTMLField(),
        ),
    ]