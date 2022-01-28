from django.db import models

# Create your models here.


class FoodCalories(models.Model):
    food_category = models.TextField()
    food_item = models.TextField()
    cals_per_100g = models.IntegerField()
    kJ_per_100g = models.IntegerField()

#LOAD DATA LOCAL INFILE 'calories.csv' INTO TABLE FoodCalories_foodcalories FIELDS TERMINATED BY ';' LINES TERMINATED BY '\n' IGNORE 2 ROWS (food_category, food_item, cals_per_100g, kJ_per_100g);