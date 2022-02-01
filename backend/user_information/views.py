from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import UserInformation
from .serializers import UserInformationSerializer

# Create your views here.


class UserInformationViews(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserInformation.objects.all()
    serializer_class = UserInformationSerializer

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
