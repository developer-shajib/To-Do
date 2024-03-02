import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getAllAuthData } from '../features/auth/authSlice.js';

const PublicGard = () => {
  const { user, token } = useSelector(getAllAuthData);

  if (token && user) {
    return user ? <Navigate to='/' /> : <Outlet />;
  }

  return <Outlet />;
};

export default PublicGard;
