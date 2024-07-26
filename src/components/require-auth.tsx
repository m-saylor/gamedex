import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuthenticated, useUserInfo } from '../hooks/redux-hooks';

function RequireAuth({ children }) {
  const authenticated = useAuthenticated();
  const userInfo = useUserInfo();
  const { username } = useParams();

  if (!authenticated || userInfo?.username !== username) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default RequireAuth;
