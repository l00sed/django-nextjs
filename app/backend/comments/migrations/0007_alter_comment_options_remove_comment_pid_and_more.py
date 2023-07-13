# Generated by Django 4.0.4 on 2023-04-30 04:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0006_comment_reply_level'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['cid', '-created_at']},
        ),
        migrations.RemoveField(
            model_name='comment',
            name='pid',
        ),
        migrations.AddField(
            model_name='comment',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='comments.comment'),
        ),
    ]