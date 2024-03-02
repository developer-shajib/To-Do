import { useEffect } from 'react';
import { useGetAllTaskQuery } from '../features/auth/authApiSlice.js';
import Header from './Header.jsx';
import Menu from './Menu.jsx';
import createToast from '../utils/createToast.jsx';
import { useDispatch } from 'react-redux';
import { setUserData } from '../features/auth/authSlice.js';

const Layout = () => {
  const { data, error } = useGetAllTaskQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return createToast(error.data.error);
    }
    if (data) {
      dispatch(setUserData({ tasks: data.tasks }));
      console.log(data.tasks);
    }
  }, [error, data, dispatch]);

  return (
    <>
      <div className=' '>
        {/* <!-- Header  --> */}
        <Header />
        {/* <!-- Menu Bar --> */}
        <Menu />
      </div>
    </>
  );
};

export default Layout;
