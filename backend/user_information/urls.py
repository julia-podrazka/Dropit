from rest_framework.routers import DefaultRouter
from .views import UserInformationViews

router = DefaultRouter()
router.register(r'user_info', UserInformationViews)
urlpatterns = router.urls
