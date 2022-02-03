from rest_framework import serializers
from .models import UserExercise, CaloriesBurnedDuringExercise


class CaloriesBurnedDuringExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaloriesBurnedDuringExercise
        fields = ('exercise',)


class CaloriesBurnedDuringExerciseIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaloriesBurnedDuringExercise
        fields = ('id',)


class UserExerciseSerializer(serializers.ModelSerializer):
    exercise_detail = CaloriesBurnedDuringExerciseSerializer(source='exercise', read_only=True)

    class Meta:
        model = UserExercise
        fields = ('exercise', 'exercise_detail', 'date', 'duration',)
        # exclude = ('user',)
