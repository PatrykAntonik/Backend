# Generated by Django 4.2.7 on 2023-12-09 21:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donation', '0014_alter_user_hospital_name_alter_user_is_hospital_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='hospital_name',
            field=models.CharField(blank=True, default='', max_length=255),
            preserve_default=False,
        ),
    ]
