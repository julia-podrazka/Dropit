from django.contrib import admin

from .models import FoodCalories, UserMeal

admin.site.register(FoodCalories)
admin.site.register(UserMeal)
