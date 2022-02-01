from rest_framework import serializers
from .models import UserInformation


class UserInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInformation
        exclude = ('user',)
