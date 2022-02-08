from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserExerciseViews, CaloriesBurnedDuringExerciseViewsAll, get_exercise_id, delete_exercise
from .viewset import get_sum

router = DefaultRouter()
router.register(r'user_ex', UserExerciseViews)
router.register(r'all_calories', CaloriesBurnedDuringExerciseViewsAll, basename='CaloriesBurnedDuringExerciseAll')
urlpatterns = [
    path('', include(router.urls)),
    path('sum_calories/', get_sum),
    path('calories/', get_exercise_id),
    path('delete/', delete_exercise),
]

