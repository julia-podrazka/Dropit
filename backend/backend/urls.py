from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('token-auth/', obtain_jwt_token),
    path('accounts/', include('accounts.urls')),
    path('user_information/', include('user_information.urls')),
    path('user_exercise/', include('CaloriesBurnedDuringExercise.urls')),
    path('user_meal/', include('FoodCalories.urls')),
]
