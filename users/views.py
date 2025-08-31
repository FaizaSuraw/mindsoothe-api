from rest_framework import status
from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })
def put(self, request):
        user = request.user
        data = request.data

        user.username = data.get("username", user.username)
        user.email = data.get("email", user.email)

        if password := data.get("password"):
            user.set_password(password)

        user.save()

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        }, status=status.HTTP_200_OK)