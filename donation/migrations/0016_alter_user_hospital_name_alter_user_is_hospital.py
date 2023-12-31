# Generated by Django 4.2.7 on 2023-12-09 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donation', '0015_alter_user_hospital_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='hospital_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_hospital',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]
