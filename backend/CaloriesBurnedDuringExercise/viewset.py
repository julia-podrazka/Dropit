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
    for obj in UserExercise.objects.filter(user=request.user, date=date.today()):
        for obj1 in CaloriesBurnedDuringExercise.objects.filter(exercise=obj.exercise):
            for obj2 in UserInformation.objects.filter(user=request.user):
                sum += obj1.calories_per_kg * obj2.weight * obj.duration / 60
    # return Response(UserExercise.objects.filter(user=request.user, date=date.today()).aggregate(Sum('duration')))
    return Response(sum)
