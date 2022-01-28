from django.contrib import admin

# Register your models here.

from .models import FoodRecipes

admin.site.register(FoodRecipes)