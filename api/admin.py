from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from api.models import UserProfile, BlogTag, BlogCategory, BlogPost, UploadedImage


class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'role',
                    'is_staff', 'is_active', 'security_question', 'security_answer')
    list_filter = ('role', 'is_staff', 'is_active', 'date_joined')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    readonly_fields = ('date_joined',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'phone_number', 'profile_image', 'city', 'state', 'country', 'summery')}),
        (_('Role'), {'fields': ('role',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff',
         'is_superuser', 'groups', 'user_permissions')}),
        (_('Security Question'), {
         'fields': ('security_question', 'security_answer')}),
        (_('Important dates'), {'fields': ('date_joined',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'role', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )


admin.site.register(UserProfile, UserAdmin)


@admin.register(BlogCategory)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'count')


@admin.register(BlogTag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'count')


@admin.register(BlogPost)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'slug', 'author',
                    'status', 'created_at', 'updated_at')


@admin.register(UploadedImage)
class UploadedImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'image', 'uploaded_at',
                    'uploaded_by', 'status', 'notification_sent')
