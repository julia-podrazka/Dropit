from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserMealViews, FoodCaloriesViews, FoodCaloriesViewsAll, FoodCaloriesCategoryViewsAll
from .viewset import get_sum

router = DefaultRouter()
router.register(r'user_m', UserMealViews)
router.register(r'calories', FoodCaloriesViews, basename='FoodCalories')
router.register(r'all_calories', FoodCaloriesViewsAll, basename='FoodCaloriesAll')
router.register(r'all_categories', FoodCaloriesCategoryViewsAll, basename='FoodCaloriesCategoryAll')
urlpatterns = [
    path('', include(router.urls)),
    path('sum_food_calories/', get_sum)
]

