from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .models import UserExercise, CaloriesBurnedDuringExercise
from .serializers import UserExerciseSerializer, CaloriesBurnedDuringExerciseSerializer, \
    CaloriesBurnedDuringExerciseIdSerializer
from rest_framework.response import Response

# Create your views here.


class CaloriesBurnedDuringExerciseViews(viewsets.ModelViewSet):
    queryset = CaloriesBurnedDuringExercise.objects.all()
    serializer_class = CaloriesBurnedDuringExerciseIdSerializer

    def get_queryset(self):
        return super().get_queryset().filter(exercise=self.request.data['exercise'])

    # @api_view(['GET'])
    # def get(self):
    #     return super().get_queryset().filter(exercise=self.request.data['exercise'])


class CaloriesBurnedDuringExerciseViewsAll(viewsets.ModelViewSet):
    queryset = CaloriesBurnedDuringExercise.objects.all()
    serializer_class = CaloriesBurnedDuringExerciseSerializer

    def get_queryset(self):
        return super().get_queryset().filter()


class UserExerciseViews(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserExercise.objects.all()
    serializer_class = UserExerciseSerializer

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    # def create(self, request, *args, **kwargs):
    #     data = {
    #         "user": self.request.user,
    #         "exercise": request.POST.get('exercise', '')
    #     }
    #     serializer = self.serializer_class(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def perform_create(self, serializer):
        save_data = {}
        contact_pk = self.request.data.get('exercise', None)
        contact = CaloriesBurnedDuringExercise.objects.filter(
            pk=contact_pk
        ).first()
        save_data['exercise'] = contact
        serializer.save(user=self.request.user, **save_data)

