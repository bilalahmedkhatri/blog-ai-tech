import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Add auth slice to manage authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('access_token') || null,
    refreshToken: Cookies.get('refresh_token') || null,
    isAuthenticated: !!Cookies.get('access_token')
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload.access;
      state.refreshToken = payload.refresh;
      state.isAuthenticated = true;
      Cookies.set('access_token', payload.access, {
        expires: 1,
        secure: true,
        sameSite: 'strict'
      });
      Cookies.set('refresh_token', payload.refresh, {
        expires: 7, // refresh tokens typically last longer
        secure: true,
        sameSite: 'strict'
      });
    },
    updateToken: (state, { payload }) => {
      state.token = payload.access;
      state.isAuthenticated = true;
      Cookies.set('access_token', payload.access, {
        expires: 1,
        secure: true,
        sameSite: 'strict'
      });
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    }
  }
});

export const { setCredentials, updateToken, logout } = authSlice.actions;

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401 && Cookies.get('refresh_token')) {
    const refreshResult = await baseQuery({
      url: 'token/refresh/',
      method: 'POST',
      body: { refresh: Cookies.get('refresh_token') },
    }, api, extraOptions);

    // If successful, update the token and retry the original request
    if (refreshResult.data) {
      // Store the new token
      api.dispatch(updateToken(refreshResult.data));
      // Retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, log the user out
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Posts', 'Categories', 'Tags'], // Add tag types for caching
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'token/',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          throw error;
        }
      },
    }),
    // Add refresh token endpoint
    // refreshToken: builder.mutation({
    //   query: (refreshToken) => ({
    //     url: 'token/refresh/',
    //     method: 'POST',
    //     body: { refresh: refreshToken },
    //   }),
    // }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'signup/',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.error('Signup failed:', error);
        }
      },
    }),
    // Forgot Password endpoint
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: 'forgot-password/',
        method: 'POST',
        body: { email },
      }),
    }),
    forgotPasswordQuestion: builder.mutation({
      query: (payload) => ({
        url: 'forgot-password/question/',
        method: 'POST',
        body: payload, // expects { email }
      }),
    }),
    forgotPasswordAnswer: builder.mutation({
      query: (payload) => ({
        url: 'forgot-password/answer/',
        method: 'POST',
        body: payload, // expects { email, security_answer, new_password }
      }),
    }),
    // Protected endpoints
    getAdminDashboard: builder.query({
      query: () => 'admin-dashboard/',
    }),
    getEditorDashboard: builder.query({
      query: () => 'editor-dashboard/',
    }),

    // New post-related endpoints
    getPosts: builder.query({
      query: () => 'posts/',
      providesTags: ['Posts']
    }),
    getPostById: builder.query({
      query: (slug) => `posts/${slug}/`,
      providesTags: (result, error, slug) => [{ type: 'Posts', id: slug }]
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: 'posts-create/',
        method: 'POST',
        body: postData,
      }),
      invalidatesTags: ['Posts']
    }),
    updatePost: builder.mutation({
      query: ({ slug, formData }) => ({
      // query: ({ slug, ...postData }) => ({
        url: `posts/${slug}/update/`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Posts', id: slug },
        'Posts'
      ]
    }),
    deletePost: builder.mutation({
      query: (slug) => ({
        url: `posts/${slug}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts']
    }),

    // Category and tag endpoints
    getCategories: builder.query({
      query: () => 'category/',
      providesTags: ['Categories']
    }),
    getTags: builder.query({
      query: () => 'tags/',
      providesTags: ['Tags']
    }),

    // Image upload endpoint
    uploadImage: builder.mutation({
      query: (imageData) => ({
        url: 'upload-image/',
        method: 'POST',
        body: imageData,
      })
    }),
    getUserProfileByIdSlug: builder.query({
      query: () => 'user/profile/',
      providesTags: ['UserProfile'],
    }),
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: 'user/profile/update/', 
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useGetAdminDashboardQuery,
  useGetEditorDashboardQuery,
  useForgotPasswordQuestionMutation,
  useForgotPasswordAnswerMutation,
  // useRefreshTokenMutation,

  // Export new hooks
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useUploadImageMutation,
  useGetUserProfileByIdSlugQuery,
  useUpdateUserProfileMutation,
} = apiSlice;
export const authReducer = authSlice.reducer;