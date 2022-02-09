from .models import CaloriesBurnedDuringExercise, UserExercise
from user_information.models import UserInformation
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date


@api_view(['GET'])
def get_sum(request):
    sum = 0
    for user_exercise in UserExercise.objects.filter(user=request.user, date=date.today()):
        for calories in CaloriesBurnedDuringExercise.objects.filter(exercise=user_exercise.exercise):
            for current_user in UserInformation.objects.filter(user=request.user):
                sum += calories.calories_per_kg * current_user.weight * user_exercise.duration / 60
    return Response(sum)
