from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .models import UserMeal, FoodCalories
from .serializers import UserMealSerializer, FoodCaloriesSerializer, FoodCaloriesIdSerializer, \
    FoodCaloriesCategorySerializer
from datetime import date
from rest_framework.response import Response

# Create your views here.


class FoodCaloriesViews(viewsets.ModelViewSet):
    queryset = FoodCalories.objects.all()
    serializer_class = FoodCaloriesIdSerializer

    def get_queryset(self):
        return super().get_queryset().filter(food_item=self.request.data['food_item'])

    # @api_view(['GET'])
    # def get(self):
    #     return super().get_queryset().filter(exercise=self.request.data['exercise'])


class FoodCaloriesViewsAll(viewsets.ModelViewSet):
    queryset = FoodCalories.objects.all()
    serializer_class = FoodCaloriesSerializer

    def get_queryset(self):
        return super().get_queryset().filter()


class FoodCaloriesCategoryViewsAll(viewsets.ModelViewSet):
    queryset = FoodCalories.objects.all()
    serializer_class = FoodCaloriesCategorySerializer

    def get_queryset(self):
        return super().get_queryset().filter()


class UserMealViews(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserMeal.objects.all()
    serializer_class = UserMealSerializer

    def get_queryset(self):
        # return super().get_queryset().filter(user=self.request.user, date=date.today(),
        #   duration=self.request.data['duration'])
        return super().get_queryset().filter(user=self.request.user, date=date.today())

    # def create(self, request, *args, **kwargs):
    #     data = {
    #         "user": self.request.user,
    #         "exercise": request.POST.get('exercise', '')
    #     }
    #     serializer = self.serializer_class(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def perform_create(self, serializer):
        save_data = {}
        contact_pk = self.request.data.get('food_item', None)
        contact = FoodCalories.objects.filter(
            pk=contact_pk
        ).first()
        save_data['food_item'] = contact
        serializer.save(user=self.request.user, **save_data)

