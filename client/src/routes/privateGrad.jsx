import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getAllAuthData } from '../features/auth/authSlice.js';

const PrivateGrad = () => {
  const { user, token } = useSelector(getAllAuthData);

  if (token && user) {
    return user ? <Outlet /> : <Navigate to='/login' />;
  }

  return <Navigate to='/login' />;
};

export default PrivateGrad;
