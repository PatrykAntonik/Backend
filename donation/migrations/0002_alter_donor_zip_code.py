# Generated by Django 4.2.7 on 2023-11-12 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donation', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donor',
            name='zip_code',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]
