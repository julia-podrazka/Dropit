from django.db import models
from django.contrib.auth import get_user_model
from datetime import date


class FoodCalories(models.Model):
    food_category = models.TextField()
    food_item = models.TextField()
    cals_per_100g = models.IntegerField()
    kJ_per_100g = models.IntegerField()

    def __str__(self):
        return str(self.food_item)


User = get_user_model()


class UserMeal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodCalories, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    category = models.CharField(max_length=30)  # such as lunch, dinner etc.
    size = models.IntegerField()  # size in grams
