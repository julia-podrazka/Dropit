from django.db.models import Sum
from .models import FoodCalories, UserMeal
from user_information.models import UserInformation
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from django.db import connection
from datetime import date


@api_view(['GET'])
def get_sum(request):
    sum = 0
    for user_meal in UserMeal.objects.filter(user=request.user, date=date.today()):
        for calories in FoodCalories.objects.filter(food_item=user_meal.food_item):
            sum += calories.cals_per_100g * user_meal.size / 100
    # return Response(UserExercise.objects.filter(user=request.user, date=date.today()).aggregate(Sum('duration')))
    return Response(sum)
