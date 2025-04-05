from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions, status, generics
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from api.models import UserProfile, BlogPost, BlogCategory, BlogTag
from api.permissions import IsAdminUserRole, IsEditorOrAdmin, IsAuthorOrReadOnly
from api.serializers import (
    ForgotPasswordQuestionSerializer,
    ForgotPasswordAnswerSerializer,
    UserProfileSignupSerializer,
    CustomTokenObtainPairSerializer,
    CategorySerializer,
    TagSerializer,
    PostSerializer,
    DashboardPostListSerializer,
    PostCreateUpdateSerializer,
    UserSerializer,
)
from django.db import models
import json
import html2text


def frontend(request, *args, **kwargs):
    return render(request, 'index.html')


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class AdminDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminUserRole]

    def get(self, request):
        return Response({'message': 'Welcome to the Admin Dashboard!'})


class EditorDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsEditorOrAdmin]

    def get(self, request):
        return Response({'message': 'Welcome to the Editor Dashboard!'})


class SignupView(APIView):
    permission_classes = []  # Allow unauthenticated access for signup

    def post(self, request):
        serializer = UserProfileSignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            user_data = {
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user_profile': user_data,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# email verification view


class VerifyEmailView(APIView):
    # Allow public access (or you may secure it via token in query params)
    permission_classes = []

    def get(self, request):
        user_id = request.query_params.get('user')
        print('user_id', user_id)
        if not user_id:
            return Response({"detail": "User not specified."}, status=status.HTTP_400_BAD_REQUEST)
        user = get_object_or_404(UserProfile, id=user_id)
        # Here you should validate the token (if implemented) before verification.
        user.is_verified = True
        user.save()
        return Response({"detail": "Email verified successfully."}, status=status.HTTP_200_OK)


class ForgotPasswordQuestionView(APIView):
    """
    Accepts an email and, if the user exists and has a security question set, returns the security question.
    """
    permission_classes = []  # Public access

    def post(self, request):
        serializer = ForgotPasswordQuestionSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = UserProfile.objects.get(email=email)
                print('email ', user.email)
                if user.email and user.security_question:
                    return Response({"security_question": user.get_security_question(user.security_question)}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "No security question set for this account."}, status=status.HTTP_400_BAD_REQUEST)
            except UserProfile.DoesNotExist:
                # Do not reveal whether the email exists for security reasons.
                return Response({"detail": "Account not found."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordAnswerView(APIView):
    """
    Accepts email, security answer, and new password. Verifies the answer and, if correct, updates the password.
    """
    permission_classes = []  # Public access

    def post(self, request):
        serializer = ForgotPasswordAnswerSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            security_answer = serializer.validated_data['security_answer']
            new_password = serializer.validated_data['new_password']
            try:
                user = UserProfile.objects.get(email=email)
                # For security, consider hashing the stored answer. Here, we compare case-insensitively.
                if user.security_answer.lower() == security_answer.lower():
                    user.set_password(new_password)
                    user.save()
                    return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "Security answer is incorrect."}, status=status.HTTP_400_BAD_REQUEST)
            except UserProfile.DoesNotExist:
                return Response({"detail": "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Returns the currently authenticated user
        return self.request.user


class UserProfileUpdateAPIView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Returns the currently authenticated user
        return self.request.user


class CreateCategory(generics.CreateAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print('serializer before', serializer)
        if serializer.is_valid():
            print('serializer after', serializer)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCategory(generics.DestroyAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"message": "Category deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)


class CategoryList(generics.ListCreateAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]  # Or your custom permission


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]  # Or your custom permission


class TagList(generics.ListCreateAPIView):
    queryset = BlogTag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAdminUser]  # Or your custom permission


class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogTag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAdminUser]  # Or your custom permission


class DashboardPostList(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = DashboardPostListSerializer


class PostDetail(generics.RetrieveAPIView):
    lookup_field = 'slug'
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            print('user :', user)
            return BlogPost.objects.filter(status='published').only("slug", "title", "content", "author", "status")
            # Fetch only required fields for performance

        if user.role == 'master_admin':
            print('user :', user.role)
            return BlogPost.objects.defer("updated_at", "content")
            # Avoid loading heavy fields unless needed

        if user.role == 'blog_admin':
            print('user :', user.role)
            return BlogPost.objects.filter(models.Q(author=user) | models.Q(status='published')).only("slug", "title", "content", "author", "status")
            # Blog admin sees all posts but fetches minimal data

        print('user :', user)
        return BlogPost.objects.filter(status='published')


class PostCreate(generics.CreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = PostCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        print("Received data:", request.data)  # Add this for debugging
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        # Generate meta title and description from content
        content = self.request.data.get('content', '')

        # Parse the JSON content to get plain text
        try:
            content_dict = json.loads(content)
            h = html2text.HTML2Text()
            h.ignore_links = True
            plain_text = h.handle(content_dict.get(
                'blocks', [{}])[0].get('text', ''))
        except:
            plain_text = ''

        # Generate meta title (use post title if available)
        meta_title = self.request.data.get('title', '')[:60]

        # Generate meta description (first 160 characters of content)
        meta_description = plain_text[:155].strip()

        serializer.save(
            author=self.request.user,
            meta_title=meta_title,
            meta_description=meta_description
        )


class PostUpdate(generics.UpdateAPIView):
    lookup_field = 'slug'
    serializer_class = PostCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'master_admin':
            return BlogPost.objects.defer("created_at")
        if user.role == 'blog_admin':
            return BlogPost.objects.filter(author=user).only('title', 'content', 'category', 'status', 'keywords')
        return BlogPost.objects.none()


class PostDelete(generics.DestroyAPIView):
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'master_admin':
            return BlogPost.objects.only("id")
        return BlogPost.objects.filter(author=user).only("id")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user != instance.author and request.user.role != "master_admin":
            return Response(
                {"error": "You do not have permission to delete this post."},
                status=status.HTTP_403_FORBIDDEN
            )
        self.perform_destroy(instance)
        return Response({"message": "Post deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
