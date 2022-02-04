from django.db.models import Sum
from .models import CaloriesBurnedDuringExercise, UserExercise
from user_information.models import UserInformation
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from django.db import connection
from datetime import date


@api_view(['GET'])
def get_sum(request):
    # current_user = UserSerializer(request.user)
    # today = date.today()
    # cursor = connection.cursor()
    # query = '''SELECT * FROM CaloriesBurnedDuringExercise_userexercise'''
    # cursor.execute(query)
    # return Response(cursor.fetchone())
    sum = 0
    for user_exercise in UserExercise.objects.filter(user=request.user, date=date.today()):
        for calories in CaloriesBurnedDuringExercise.objects.filter(exercise=user_exercise.exercise):
            for current_user in UserInformation.objects.filter(user=request.user):
                sum += calories.calories_per_kg * current_user.weight * user_exercise.duration / 60
    # return Response(UserExercise.objects.filter(user=request.user, date=date.today()).aggregate(Sum('duration')))
    return Response(sum)
