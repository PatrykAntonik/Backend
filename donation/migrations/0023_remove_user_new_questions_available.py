# Generated by Django 5.0 on 2024-01-16 00:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('donation', '0022_alter_donation_donation_type_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='new_questions_available',
        ),
    ]