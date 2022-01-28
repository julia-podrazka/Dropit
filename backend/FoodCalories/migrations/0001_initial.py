# Generated by Django 3.2.11 on 2022-01-27 02:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FoodCalories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('food_category', models.TextField()),
                ('food_item', models.TextField()),
                ('cals_per_100g', models.IntegerField()),
                ('kJ_per_100g', models.IntegerField()),
            ],
        ),
    ]