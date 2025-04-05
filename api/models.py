from django.db import models
from django.utils.text import slugify
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        extra_fields.setdefault('role', 'user')
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a superuser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        # Set default role for superusers
        extra_fields.setdefault('role', 'master_admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class UserProfile(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('master_admin', 'Master Admin'),
        ('blog_admin', 'Blog Admin'),
        ('ai_video_editor_user', 'AI Video Editor User'),
        ('user', 'User'),
    )

    SECURITY_QUESTIONS = (
        ('first_pet', 'What was the name of your first pet?'),
        ('mother_maiden', "What is your mother's maiden name?"),
        ('birth_city', 'In which city were you born?'),
        ('first_school', 'What was the name of your first school?'),
        ('favorite_teacher', 'Who was your favorite teacher?'),
        ('childhood_friend', 'What is the name of your best childhood friend?'),
        ('first_car', 'What was the make and model of your first car?'),
        ('favorite_place', 'What is your favorite vacation spot?'),
        ('parents_met', 'In which city did your parents meet?'),
        ('childhood_hero', 'Who was your childhood hero?'),
    )

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, default='user')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_verified = models.BooleanField(default=False)  # for email verification

    city = models.CharField(max_length=100, default='', blank=True)
    state = models.CharField(max_length=100, default='', blank=True)
    zip_code = models.IntegerField(default=0, blank=True)
    country = models.CharField(max_length=100, default='', blank=True)
    address1 = models.TextField(max_length=300, default='', blank=True)
    address2 = models.TextField(max_length=300, default='', blank=True)

    security_question = models.CharField(
        max_length=255, choices=SECURITY_QUESTIONS, blank=True, default='')
    security_answer = models.CharField(max_length=255, blank=True)
    
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    summery = models.TextField(max_length=500, blank=True, null=True)

    objects = CustomUserManager()

    # Set email as the USERNAME_FIELD for authentication.
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Only email and password are required

    def __str__(self):
        return self.email

    def get_security_question(self, question: str) -> str:
        if not question:
            return ''
        qeustions = dict(self.SECURITY_QUESTIONS)
        return qeustions.get(question, '')


class BlogCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    created_by = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name='blog_categories')
    count = models.IntegerField(default=1)
    # Optional description for category
    description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class BlogTag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    created_by = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="blog_tags")
    count = models.IntegerField(default=1)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class UploadedImage(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('using', 'In Use'),
    )

    image = models.ImageField(upload_to='media/content_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="blog_detailed_images")
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='pending')
    notification_sent = models.BooleanField(default=False)

    def __str__(self):
        return f"Image uploaded by {self.uploaded_by.first_name} at {self.uploaded_at} - {self.status}"


class BlogPost(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('pending', 'Pending'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    author = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name='blog_posts')
    category = models.ForeignKey(
        BlogCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts')
    tags = models.ManyToManyField(BlogTag, blank=True, related_name='posts')
    content = models.TextField()  # Store the HTML content from the editor
    # Optional summary of the post
    excerpt = models.TextField(blank=True, null=True)
    featured_image = models.ImageField(
        upload_to='post_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(
        null=True, blank=True)  # When the post was published
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='draft')
    meta_title = models.CharField(max_length=255, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    keywords = models.TextField(
        blank=True, null=True, help_text="Comma-separated keywords")
    view_count = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)
    # Dashboard specific fields:
    is_approved = models.BooleanField(default=False, help_text="Post approval status for dashboard moderation")
    is_featured = models.BooleanField(default=False, help_text="Mark post as featured on the dashboard")

    def save(self, *args, **kwargs):
        # Auto-generate slug if not provided
        if not self.slug:
            self.slug = slugify(self.title)
        # Automatically set published_at if status is published and not already set
        if self.status == 'published' and self.published_at is None:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-published_at', '-created_at']
