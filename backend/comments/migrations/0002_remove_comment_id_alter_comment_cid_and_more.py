# Generated by Django 4.0.4 on 2022-05-30 23:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='id',
        ),
        migrations.AlterField(
            model_name='comment',
            name='cid',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='comment',
            name='pid',
            field=models.IntegerField(),
        ),
    ]
