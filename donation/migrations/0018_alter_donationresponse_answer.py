# Generated by Django 5.0 on 2023-12-23 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donation', '0017_alter_user_is_hospital'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donationresponse',
            name='answer',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]
