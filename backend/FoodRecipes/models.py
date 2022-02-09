from django.db import models


class FoodRecipes(models.Model):
    recipe_title = models.TextField()
    url = models.URLField(max_length=1000)
    vote_count = models.IntegerField()
    rating = models.DecimalField(max_digits=14, decimal_places=13)
    description = models.TextField()
    course = models.TextField()
    diet = models.TextField()
    prep_time = models.IntegerField()
    cook_time = models.IntegerField()
    calories = models.IntegerField()
