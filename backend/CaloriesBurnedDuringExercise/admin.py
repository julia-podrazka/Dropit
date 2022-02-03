from django.contrib import admin

# Register your models here.

from .models import CaloriesBurnedDuringExercise, UserExercise

admin.site.register(CaloriesBurnedDuringExercise)
admin.site.register(UserExercise)
