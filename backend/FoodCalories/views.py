from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .models import UserMeal, FoodCalories
from .serializers import UserMealSerializer, FoodCaloriesSerializer, FoodCaloriesIdSerializer, \
    FoodCaloriesCategorySerializer
from datetime import date
from rest_framework.response import Response


@api_view(['POST'])
def get_food_id(request):
    string = request.data['food_item']
    for item in FoodCalories.objects.filter(food_item=string):
        return Response(item.pk)


@api_view(['POST'])
def delete_food(request):
    string = request.data['food_item']
    current_date = request.data['date']
    food_category = request.data['category']
    food_size = request.data['size']
    user = request.user
    for item in UserMeal.objects.filter(user=user.pk, category=food_category, size=food_size, date=current_date):
        for food in FoodCalories.objects.filter(food_item=string):
            if item.food_item == food:
                query = item
                query.delete()
                return Response("Deleted")
    return Response("Not found")


class FoodCaloriesViews(viewsets.ModelViewSet):
    queryset = FoodCalories.objects.all()
    serializer_class = FoodCaloriesIdSerializer

    def get_food(self, request):
        return super().get_queryset().filter(food_item=str(request))


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
        return super().get_queryset().filter(user=self.request.user, date=date.today())

    def perform_create(self, serializer):
        save_data = {}
        contact_pk = self.request.data.get('food_item', None)
        contact = FoodCalories.objects.filter(
            pk=contact_pk
        ).first()
        save_data['food_item'] = contact
        serializer.save(user=self.request.user, **save_data)

