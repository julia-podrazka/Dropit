from django.contrib import admin
from django.urls import path

<<<<<<< HEAD
urlpatterns = [
    path('admin/', admin.site.urls),
]
=======
from accounts.views import (
    login_view,
    logout_view,
    register_view,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
]
>>>>>>> new_backend
