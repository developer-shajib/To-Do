import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input.jsx';
import loginImg from '../assets/images/login-img.jpg';
import useFormFields from '../hooks/useFormFieldsHook.jsx';
import { useLoginMutation } from '../features/auth/authApiSlice.js';
import { useDispatch } from 'react-redux';
import createToast from '../utils/createToast.jsx';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { setUserData } from '../features/auth/authSlice.js';

function Login() {
  const { input, setInput, handleInputChange } = useFormFields({ email: '', password: '' });
  const [login, { data, error, isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input.email || !input.password) return createToast('All fields are required');

    dispatch(login(input));
  };

  useEffect(() => {
    if (error) {
      return createToast(error.data.error);
    }
    if (data) {
      Cookies.set('accessToken', data.token);
      dispatch(setUserData({ token: data.token, user: data?.user }));
      createToast(data.message, 'success');
      setInput((prevState) => ({ ...prevState, email: '', password: '' }));
      navigate('/');
    }
  }, [error, data, setInput, navigate, dispatch]);

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
          {/* <!-- left side --> */}
          <div className='flex flex-col justify-center p-8 md:p-14'>
            <span className='mb-3 text-4xl font-bold text-primary-gradient'>Login</span>

            {/* <!-- Login form start --> */}

            <form onSubmit={handleFormSubmit}>
              <Input
                title='Email'
                name='email'
                type='text'
                placeholder='example@gmail.com'
                value={input.email}
                handleInputChange={handleInputChange}
              />
              <Input
                title='Password'
                name='password'
                type='password'
                placeholder='••••••••'
                value={input.password}
                handleInputChange={handleInputChange}
              />
              <div className='flex justify-center w-full py-4'>
                <Link
                  to='/forget'
                  className='font-bold text-base text-blue-900 underline hover:text-red-700 transition'>
                  Forgot password?
                </Link>
              </div>
              <button
                type='submit'
                className='w-full bg-slate-700 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black border hover:border-gray-300 transition flex gap-2 justify-center items-center'>
                <p>{isLoading ? 'Please wait....' : 'Sign In'}</p>
              </button>
            </form>

            {/* <!-- Login form end --> */}

            <div className='text-center text-gray-400'>
              {`Dont'have an account?`}
              <Link
                to='/register'
                className='font-bold text-blue-900 ml-2 underline hover:text-red-700 transition'>
                Sign up
              </Link>
            </div>
          </div>

          {/* <!-- right side --> */}
          <div className='relative'>
            <img
              className='hidden h-full  rounded-r-2xl md:block object-cover'
              width={400}
              height={'100%'}
              src={loginImg}
              alt='img'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
