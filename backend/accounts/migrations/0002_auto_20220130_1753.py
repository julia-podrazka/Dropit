# Generated by Django 3.2.11 on 2022-01-30 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='age',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='height',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='max_calories',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='weight',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
