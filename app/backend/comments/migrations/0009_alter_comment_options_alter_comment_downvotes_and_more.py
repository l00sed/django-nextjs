# Generated by Django 4.2.3 on 2023-07-11 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0008_alter_comment_options_comment_approved_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={},
        ),
        migrations.AlterField(
            model_name='comment',
            name='downvotes',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='comment',
            name='reply_level',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='comment',
            name='upvotes',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
