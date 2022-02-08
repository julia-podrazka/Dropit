from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class UserInformation(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    name = models.CharField(max_length=30)
    age = models.IntegerField()
    gender = models.CharField(max_length=1)
    weight = models.IntegerField()
    height = models.IntegerField()
    vegetarian = models.CharField(max_length=1)
    max_calories = models.IntegerField()

    def __str__(self):
        return str(self.name)
