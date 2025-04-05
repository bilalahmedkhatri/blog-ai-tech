from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import (
    frontend,
    AdminDashboardView,
    EditorDashboardView,
    CustomTokenObtainPairView,
    SignupView,
    VerifyEmailView,
    ForgotPasswordQuestionView,
    ForgotPasswordAnswerView,
    DashboardPostList, PostDetail, PostCreate, PostUpdate, PostDelete,
    UserProfileRetrieveAPIView, UserProfileUpdateAPIView, CreateCategory, DeleteCategory, CategoryList, CategoryDetail, TagList, TagDetail,
)

urlpatterns = [
#     path('', frontend, name='frontend'),

    # JWT token endpoints
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Registration endpoint
    path('signup/', SignupView.as_view(), name='signup'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('forgot-password/question/', ForgotPasswordQuestionView.as_view(),
         name='forgot_password_question'),
    path('forgot-password/answer/', ForgotPasswordAnswerView.as_view(),
         name='forgot_password_answer'),
    # ... additional endpoints ...
    # Protected endpoints
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('editor-dashboard/', EditorDashboardView.as_view(),
         name='editor_dashboard'),


    # from previous blog
    path('user/profile/', UserProfileRetrieveAPIView.as_view(), name='user-profile'),
    path('user/profile/update/', UserProfileUpdateAPIView.as_view(),
         name='user-profile-update'),
    path('category/create/', CreateCategory.as_view(), name='category-create'),
    path('category/<int:pk>/delete/',
         DeleteCategory.as_view(), name='category-delete'),
    path('category/', CategoryList.as_view(), name='category-list'),
    path('category/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('tags/', TagList.as_view(), name='tag-list'),
    path('tags/<int:pk>/', TagDetail.as_view(), name='tag-detail'),
    path('posts/', DashboardPostList.as_view(), name='post-list'),
    path('posts/<slug:slug>/', PostDetail.as_view(), name='post-detail'),
    path('posts-create/', PostCreate.as_view(), name='post-create'),
    path('posts/<slug:slug>/update/', PostUpdate.as_view(), name='post-update'),
    path('posts/<slug:slug>/delete/', PostDelete.as_view(), name='post-delete'),
]
