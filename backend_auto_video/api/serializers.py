from tkinter.tix import Tree
from rest_framework import serializers
from api.models import UserProfile, BlogPost, BlogTag, BlogCategory, UploadedImage
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Optionally, add custom claims
        token['email'] = user.email
        token['name'] = f"{user.first_name} {user.last_name}"
        token['role'] = user.role
        return token

    def validate(self, attrs):
        # Map 'email' to 'username' for authentication purposes
        attrs['username'] = attrs.get('email')
        return super().validate(attrs)


class UserProfileSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserProfile
        fields = ['email', 'password', 'first_name', 'last_name']

    # {
    # "email":"travelkhatri786@gmail.com", "password":"ashaaz123", "first_name":"Usman", "last_name":"ghani"
    # }

    def create(self, validated_data):
        user = UserProfile.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.role = 'user'  # Set the default role to 'user'
        user.is_staff = True
        user.save()
        return user


from rest_framework import serializers
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        # List only the fields you want to expose and allow updates for
        fields = [
            'id', 'email', 'first_name', 'last_name', 'phone_number', 'profile_image', 'country', 'summery',
            'city', 'state',
        ]
        read_only_fields = ['id', 'email']  # Email and ID are read-only

        
class ForgotPasswordQuestionSerializer(serializers.Serializer):
    email = serializers.EmailField()

class ForgotPasswordAnswerSerializer(serializers.Serializer):
    email = serializers.EmailField()
    security_answer = serializers.CharField(max_length=255)
    new_password = serializers.CharField(write_only=True, min_length=6)


class CategorySerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'created_by_name', 'count']

    def get_created_by_name(self, obj):
        if obj.created_by:
            return f"{obj.created_by.first_name} {obj.created_by.last_name}" 
        return None


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTag
        fields = ['id', 'name', 'slug', 'count']

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'author', 'category', 'tags',
            'content', 'featured_image', 'created_at', 'updated_at',
            'status', 'meta_title', 'meta_description', 'keywords'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']
                

class DashboardPostListSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'status', 'author', 'slug', 'category', 'tags', 'keywords'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']

class PostCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            'title', 'content', 'category', 'tags', 'featured_image', 'status', 'keywords'
        ]