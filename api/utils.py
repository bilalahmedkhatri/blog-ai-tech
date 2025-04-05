from os import access
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from api.models import UserProfile
from rest_framework_simplejwt.tokens import RefreshToken


class VerifyEmailView(APIView):
    permission_classes = []  # Allow public access (or you may secure it via token in query params)

    def get(self, request):
        user_id = request.query_params.get('user')
        if not user_id:
            return Response({"detail": "User not specified."}, status=status.HTTP_400_BAD_REQUEST)
        user = get_object_or_404(UserProfile, id=user_id)
        # Here you should validate the token (if implemented) before verification.
        user.is_verified = True
        user.save()
        return Response({"detail": "Email verified successfully."}, status=status.HTTP_200_OK)

