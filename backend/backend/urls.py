from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .views import index
from rest_framework_jwt.views import obtain_jwt_token

# from accounts.views import (
#     login_view,
#     logout_view,
#     register_view,
# )

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('login/', login_view),
    # path('logout/', logout_view),
    # path('register/', register_view),
    path('', TemplateView.as_view(template_name='index.html')),
    path('token-auth/', obtain_jwt_token),
    path('accounts/', include('accounts.urls')),
    path('user_information/', include('user_information.urls')),
]
