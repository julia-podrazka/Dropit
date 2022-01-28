from django.contrib import admin

# Register your models here.

from .models import FoodCalories

admin.site.register(FoodCalories)