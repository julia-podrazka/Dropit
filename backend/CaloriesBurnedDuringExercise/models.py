# Create your models here.
from django.db import models


class CaloriesBurnedDuringExercise(models.Model):
    exercise = models.TextField()
    lb130 = models.IntegerField()
    lb150 = models.IntegerField()
    lb180 = models.IntegerField()
    lb205 = models.IntegerField()
    calories_per_kg = models.DecimalField(max_digits=15, decimal_places=14)

#LOAD DATA LOCAL INFILE 'exercise_dataset.csv' INTO TABLE CaloriesBurnedDuringExercise_caloriesburnedduringexercise FIELDS TERMINATED BY ';' LINES TERMINATED BY '\n' IGNORE 2 ROWS (exercise, lb130, lb150, lb180, lb205, calories_per_kg);
