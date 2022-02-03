from rest_framework.routers import DefaultRouter
from .views import UserExerciseViews, CaloriesBurnedDuringExerciseViews, CaloriesBurnedDuringExerciseViewsAll

router = DefaultRouter()
router.register(r'user_ex', UserExerciseViews)
router.register(r'calories', CaloriesBurnedDuringExerciseViews, basename='CaloriesBurnedDuringExercise')
router.register(r'all_calories', CaloriesBurnedDuringExerciseViewsAll, basename='CaloriesBurnedDuringExerciseAll')
urlpatterns = router.urls


