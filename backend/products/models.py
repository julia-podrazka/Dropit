from django.db import models

# Create your models here.


from django.db import models


class Product(models.Model):
    title = models.TextField()
    price = models.TextField()