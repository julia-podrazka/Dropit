from accounts.serializers import UserSerializer


def my_jwt_response_handler(token, user=None, request=None, issued_at=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }