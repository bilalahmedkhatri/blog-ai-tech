# Generated by Django 5.1.7 on 2025-03-24 02:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='address1',
            field=models.TextField(blank=True, default='', max_length=300),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='address2',
            field=models.TextField(blank=True, default='', max_length=300),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='city',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='country',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='state',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='zip_code',
            field=models.IntegerField(blank=True, default=0, max_length=100),
        ),
    ]
