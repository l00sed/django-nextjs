# Generated by Django 4.2.6 on 2023-10-31 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lqip', '0002_alter_lqip_base64'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lqip',
            name='base64',
            field=models.CharField(max_length=100000),
        ),
    ]
