# Generated by Django 4.0.4 on 2023-04-30 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0005_alter_comment_downvotes_alter_comment_upvotes'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='reply_level',
            field=models.IntegerField(default=0),
        ),
    ]
