// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isAdmin, ...rest }) => {
    return isAdmin ? <Component {...rest} /> : <Navigate to="/home" />;
};

export default ProtectedRoute;
