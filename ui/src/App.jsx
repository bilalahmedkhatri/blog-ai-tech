import 'vite/modulepreload-polyfill'
import * as React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice, authReducer } from './apiSlice.jsx';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Dashboard from './dashboard/Dashboard';
import SignIn from './dashboard/SignIn';
import SignUpForm from './dashboard/SignUpForm';
import ForgotPassword from './dashboard/ForgetPassword';
import PostCreate from './dashboard/PostCreate'
import MainGridBlog from "./dashboard/components/MainGridBlog";
import PostView from './pages/PostView';
import UpdatePost from './pages/UpdatePost';
import UserProfile from './pages/UserProfile';
import { HelmetProvider } from "react-helmet-async";


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: '/login', element: <SignIn /> },
      { path: '/signup', element: <SignUpForm /> },
      { path: '/forget-password', element: <ForgotPassword /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Dashboard />,
        children: [
          { path: '/dashboard', element: <MainGridBlog /> },
          { path: '/user-profile', element: <UserProfile /> },
          { path: '/dashboard/create-post', element: <PostCreate /> },
          { path: '/dashboard/create-post/:slug', element: <PostCreate /> },
          { path: '/dashboard/update-post/:slug', element: <UpdatePost /> },
          { path: '/dashboard/post/:slug', element: <PostView /> },
          // { path: '/dashboard/clients', element: <Clients /> },
          // { path: '/dashboard/tasks', element: <Tasks /> },
          // { path: '/dashboard/profile', element: <Profile /> },
        ]
      },
      {
        element: <HelmetProvider />,
        children: [
          { path: '/post/:slug', element: <PostView /> },
        ]
      },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
