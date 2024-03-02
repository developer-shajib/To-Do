import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input.jsx';
import registerImg from '../assets/images/register.jpg';
import { useEffect } from 'react';
import useFormFields from '../hooks/useFormFieldsHook.jsx';
import createToast from '../utils/createToast.jsx';
import { useRegisterMutation } from '../features/auth/authApiSlice.js';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setUserData } from '../features/auth/authSlice.js';

const Register = () => {
  const { input, setInput, handleInputChange } = useFormFields({ name: '', email: '', password: '' });
  const [register, { data, error, isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input.name || !input.email || !input.password) return createToast('All fields are required');

    dispatch(register(input));
  };

  useEffect(() => {
    if (error) {
      return createToast(error.data.error);
    }
    if (data) {
      Cookies.set('accessToken', data.token);
      dispatch(setUserData({ user: data?.user }));
      createToast(data.message, 'success');
      setInput((prevState) => ({ ...prevState, name: '', email: '', password: '' }));
      navigate('/');
    }
  }, [error, data, setInput, navigate, dispatch]);

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
          {/* <!-- left side --> */}
          <div className='flex flex-col justify-center p-8 md:p-14'>
            <span className='mb-3 text-4xl font-bold text-primary-gradient'>Register</span>

            {/* <!-- register form  --> */}
            <form
              action=''
              onSubmit={handleFormSubmit}>
              <Input
                title='Name'
                name='name'
                type='text'
                placeholder='your name'
                value={input.name}
                handleInputChange={handleInputChange}
              />
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

              <button className=' w-full bg-slate-700 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black border hover:border-gray-300 transition '> {isLoading ? 'Please wait...' : 'Sign Up'}</button>
            </form>

            <div className='text-center text-gray-400'>
              Already have an account?
              <Link
                to='/login'
                className='font-bold text-blue-900 ml-2 underline hover:text-red-700 transition'>
                Sign In
              </Link>
            </div>
          </div>

          {/* <!-- right side --> */}
          <div className='relative'>
            <img
              className='hidden h-full  rounded-r-2xl md:block object-cover'
              width={400}
              height={'100%'}
              src={registerImg}
              alt='img'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
