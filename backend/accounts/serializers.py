from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Users
from allauth.account.adapter import get_adapter


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('username', 'name', 'age', 'gender', 'weight', 'height',
                  'vegetarian', 'max_calories')

# Register user


class UserSerializerWithToken(serializers.Serializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = Users
        fields = ('token', 'username', 'password', 'name', 'age', 'gender', 'weight', 'height',
                  'vegetarian', 'max_calories')

    # def validate_password(self, password):
    #     return get_adapter().clean_password(password)
    #
    # def get_clean_data(self):
    #     return {
    #         'user_type': self.validated_data.get('user_type', ''),
    #         'password': self.validated_data.get('password', ''),
    #     }
    #
    # def save(self, request):
    #     adapter = get_adapter()
    #     user = adapter.new_user(request)
    #     self.cleaned_data = self.get_clean_data()
    #     adapter.save_user(request, user, self)
    #     self.custom_signup(request, user)
    #     return user
