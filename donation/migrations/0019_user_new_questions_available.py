# Generated by Django 5.0 on 2023-12-24 00:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donation', '0018_alter_donationresponse_answer'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='new_questions_available',
            field=models.BooleanField(default=False),
        ),
    ]
