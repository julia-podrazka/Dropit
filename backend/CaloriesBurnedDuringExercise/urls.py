from rest_framework.routers import DefaultRouter
from .views import UserExerciseViews, CaloriesBurnedDuringExerciseViews

router = DefaultRouter()
router.register(r'user_ex', UserExerciseViews)
router.register(r'calories', CaloriesBurnedDuringExerciseViews, basename='CaloriesBurnedDuringExercise')
urlpatterns = router.urls


