from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .models import UserExercise, CaloriesBurnedDuringExercise
from .serializers import UserExerciseSerializer, CaloriesBurnedDuringExerciseSerializer, \
    CaloriesBurnedDuringExerciseIdSerializer
from datetime import date
from rest_framework.response import Response


@api_view(['POST'])
def get_exercise_id(request):
    string = request.data['exercise']
    for item in CaloriesBurnedDuringExercise.objects.filter(exercise=string):
        return Response(item.pk)


@api_view(['POST'])
def delete_exercise(request):
    string = request.data['exercise']
    current_date = request.data['date']
    exercise_duration = request.data['duration']
    user = request.user
    for item in UserExercise.objects.filter(user=user.pk, duration=exercise_duration, date=current_date):
        for exercise in CaloriesBurnedDuringExercise.objects.filter(exercise=string):
            if item.exercise == exercise:
                query = item
                query.delete()
                return Response("Deleted")
    return Response("Not found")


class CaloriesBurnedDuringExerciseViews(viewsets.ModelViewSet):
    queryset = CaloriesBurnedDuringExercise.objects.all()
    serializer_class = CaloriesBurnedDuringExerciseIdSerializer

    def get_queryset(self):
        return super().get_queryset().filter(exercise=self.request.data['exercise'])


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
        return super().get_queryset().filter(user=self.request.user, date=date.today())

    def perform_create(self, serializer):
        save_data = {}
        contact_pk = self.request.data.get('exercise', None)
        contact = CaloriesBurnedDuringExercise.objects.filter(
            pk=contact_pk
        ).first()
        save_data['exercise'] = contact
        serializer.save(user=self.request.user, **save_data)
