from rest_framework import serializers
from .models import UserMeal, FoodCalories


class FoodCaloriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCalories
        fields = ('food_item',)


class FoodCaloriesCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCalories
        fields = ('food_category',)


class FoodCaloriesIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCalories
        fields = ('id',)


class UserMealSerializer(serializers.ModelSerializer):
    food_item_detail = FoodCaloriesSerializer(source='food_item', read_only=True)

    class Meta:
        model = UserMeal
        fields = ('food_item', 'food_item_detail', 'date', 'category', 'size',)
        # exclude = ('user',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMeal
        fields = ('user',)
