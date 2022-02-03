from django.db.models import Sum
from .models import CaloriesBurnedDuringExercise, UserExercise
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
    return Response(UserExercise.objects.filter(user=request.user, date=date.today()).aggregate(Sum('duration')))
