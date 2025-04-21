import imghdr
from PIL import Image
from django.core.validators import FileExtensionValidator
from rest_framework import serializers
from api.models import UserProfile, BlogPost, BlogTag, BlogCategory
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['name'] = f"{user.first_name} {user.last_name}"
        token['role'] = user.role
        return token

    def validate(self, attrs):
        email = attrs.get('email')
        if not email:
            raise serializers.ValidationError(
                {"email": "This field is required."})
        attrs['username'] = email.strip().lower()
        return super().validate(attrs)


class UserProfileSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name', 'email', 'password']

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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        # List only the fields you want to expose and allow updates for
        fields = [
            'id', 'email', 'first_name', 'last_name', 'phone_number', 'profile_image', 'country', 'summery',
            'city', 'security_question', 'security_answer',
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


class UploadedImageSerializer(serializers.Serializer):
    allow_file_ext = ['jpg', 'jpeg', 'png', 'gif']
    image = serializers.ImageField(
        validators=[
            FileExtensionValidator(allowed_extensions=allow_file_ext)
        ]
    )

    id = serializers.IntegerField(read_only=True)
    url = serializers.CharField(read_only=True)
    name = serializers.CharField(read_only=True)
    size = serializers.IntegerField(read_only=True)
    width = serializers.IntegerField(read_only=True)
    height = serializers.IntegerField(read_only=True)

    def validate_image(self, file):
        # 1. File size check
        max_size = 5 * 1024 * 1024  # 5 MB
        if file.size > max_size:
            raise serializers.ValidationError("Image too large (max 5MB).")

        # 2. MIME-type check via imghdr
        file.open()
        header = file.read(512)
        file_type = imghdr.what(None, header)
        if file_type not in self.allow_file_ext:
            raise serializers.ValidationError("Invalid image format.")

        # 3. Pillow validation
        try:
            file.seek(0)
            img = Image.open(file)
            img.verify()
        except Exception:
            raise serializers.ValidationError(
                "Corrupted or invalid image file.")

        # Reset pointer
        file.seek(0)
        return file

    def create(self, validated_data):
        user = self.context['request'].user
        ImageModel = self.context['view'].queryset.model
        instance = ImageModel.objects.create(
            image=validated_data['image'],
            uploaded_by=user,
            status='using'
        )
        return instance

    def to_representation(self, instance) -> dict:
        request = self.context['request']
        uri = request.build_absolute_uri(instance.image.url)
        width, height = Image.open(instance.image.path).size
        return {
            'id': instance.id,
            'url': uri,
            'name': instance.image.name.split('/')[-1],
            'size': instance.image.size,
            'width': width,
            'height': height
        }
