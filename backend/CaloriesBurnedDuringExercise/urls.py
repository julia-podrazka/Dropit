from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserExerciseViews, CaloriesBurnedDuringExerciseViews, CaloriesBurnedDuringExerciseViewsAll, \
    get_exercise_id
from .viewset import get_sum

router = DefaultRouter()
router.register(r'user_ex', UserExerciseViews)
# router.register(r'calories', CaloriesBurnedDuringExerciseViews, basename='CaloriesBurnedDuringExercise')
router.register(r'all_calories', CaloriesBurnedDuringExerciseViewsAll, basename='CaloriesBurnedDuringExerciseAll')
# router.register(r'sum_calories', get_sum, basename='Sum')
urlpatterns = [
    path('', include(router.urls)),
    path('sum_calories/', get_sum),
    path('calories/', get_exercise_id),
]

