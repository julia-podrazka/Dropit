from django.contrib import admin

# Register your models here.

from .models import FoodCalories, UserMeal

admin.site.register(FoodCalories)
admin.site.register(UserMeal)
