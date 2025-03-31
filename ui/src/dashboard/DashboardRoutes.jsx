import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import PostCreate from './PostCreate';

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="create-post" element={<PostCreate />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default DashboardRoutes;