# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from datetime import date


class CaloriesBurnedDuringExercise(models.Model):
    exercise = models.TextField()
    lb130 = models.IntegerField()
    lb150 = models.IntegerField()
    lb180 = models.IntegerField()
    lb205 = models.IntegerField()
    calories_per_kg = models.DecimalField(max_digits=15, decimal_places=14)  # exercising for an hour

    def __str__(self):
        return str(self.exercise)


User = get_user_model()


class UserExercise(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(CaloriesBurnedDuringExercise, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    duration = models.IntegerField()  # duration in minutes


#LOAD DATA LOCAL INFILE 'exercise_dataset.csv' INTO TABLE CaloriesBurnedDuringExercise_caloriesburnedduringexercise FIELDS TERMINATED BY ';' LINES TERMINATED BY '\n' IGNORE 2 ROWS (exercise, lb130, lb150, lb180, lb205, calories_per_kg);
