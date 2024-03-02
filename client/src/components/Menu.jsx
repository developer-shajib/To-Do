import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { AiOutlineHome } from 'react-icons/ai';
import { GoProject } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import { useCreateProjectMutation, useGetAllProjectsQuery, useLogoutMutation } from '../features/auth/authApiSlice.js';
import { useEffect, useState } from 'react';
import createToast from '../utils/createToast.jsx';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../assets/images/avatar.jpg';
import Modal from './Modal.jsx';
import { addNewData, getAllAuthData, setUserData } from '../features/auth/authSlice.js';
import useFormFields from '../hooks/useFormFieldsHook.jsx';

const Menu = () => {
  const [logout, { error, data }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { data: getProjectData } = useGetAllProjectsQuery();
  const { projects } = useSelector(getAllAuthData);
  const { input, setInput, handleInputChange } = useFormFields({ name: '' });
  const [createProject, { error: createProjectError, isLoading: createProjectLoading, data: createProjectData }] = useCreateProjectMutation();

  // Create Task Form Submit Handler
  const handleTaskCreateFormSubmit = (e) => {
    e.preventDefault();

    if (!input.name) return createToast('Provide project name');

    dispatch(createProject(input));
  };

  useEffect(() => {
    if (error) {
      return createToast(error.data.error);
    }
    if (data) {
      Cookies.remove('accessToken', data.token);
      navigate('/login');
    }
  }, [error, data, navigate]);

  useEffect(() => {
    if (getProjectData) {
      dispatch(setUserData({ projects: getProjectData?.projects }));
    }
  }, [getProjectData, dispatch]);

  useEffect(() => {
    if (createProjectError) {
      return createToast(createProjectError.data.error);
    }
    if (createProjectData) {
      setModal(false);
      setInput((prevState) => ({ ...prevState, name: '' }));
      dispatch(addNewData({ projects: createProjectData?.project }));
      createToast(createProjectData.message, 'success');
    }
  }, [createProjectError, createProjectData, dispatch, setInput]);

  return (
    <>
      {/* <!-- Modal Start --> */}
      <Modal
        isOpen={modal}
        onClose={() => setModal(!modal)}>
        <form
          onSubmit={handleTaskCreateFormSubmit}
          action=''
          className='mt-10 flex gap-2'>
          <input
            name='name'
            value={input.name}
            onChange={handleInputChange}
            className='border-2 border-slate-400 outline-none rounded-lg px-2 py-1'
            type='text'
            placeholder='type project name'
          />
          <button
            type='submit'
            className='bg-blue-500 px-2 py-1 rounded-lg text-white hover:bg-blue-400'>
            {createProjectLoading ? 'Loading...' : 'Create'}
          </button>
        </form>
      </Modal>
      {/* <!-- Modal End --> */}

      <div className='flex  '>
        {/* <!-- Left Side Start --> */}
        <div className='w-1/4  bg-slate-100 text-slate-500 border-r-2 border-slate-200 flex justify-between flex-col h-[91vh] sticky left-0 top-14 bottom-0   z-40'>
          <div className='pt-3 px-2 h-full overflow-auto relative ]'>
            <button
              onClick={() => setModal(!modal)}
              className='bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white text-lg w-full rounded-md shadow-xl py-2 mt-2 px-7 '>
              + New Project
            </button>
            <ul className=' flex flex-col mt-6 '>
              <li className='text-black hover:bg-white  transition-all duration-300 rounded-md  '>
                <Link
                  to={'/'}
                  className='flex gap-2 items-center text-lg px-4 py-2'>
                  <AiOutlineHome /> Dashboard
                </Link>
              </li>
              <li className='text-black hover:bg-white bg-white transition-all duration-300 rounded-md px-4 '>
                <button className='flex justify-between items-center w-full'>
                  <div className='flex gap-2 items-center text-lg py-2'>
                    <GoProject /> Project
                  </div>
                  <IoIosArrowDown />
                </button>
              </li>
              <ul className=' rounded flex flex-col gap-1 w-full '>
                {projects.length > 0 &&
                  projects?.map((item) => (
                    <li
                      key={item?._id}
                      className='text-slate-500 hover:bg-gray-200  bg-white   transition-all duration-300 rounded-md text-md border-[1px] border-slate-200 w-full'>
                      <Link
                        to={`project/${item?._id}`}
                        className='px-6 py-2 flex w-full'>
                        {item?.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </ul>
          </div>
          <Link
            onClick={() => dispatch(logout())}
            to={'#'}
            className='flex items-center justify-between bg-white px-4 py-2 hover:bg-slate-300 transition-all duration-300'>
            <div className='flex gap-2 items-center'>
              <img
                className='w-10 h-10 rounded-full'
                src={Avatar}
                alt='name'
              />
              <p>Shajibul Islam</p>
            </div>
            <IoLogOutOutline className='text-xl text-slate-900' />
          </Link>
        </div>
        {/* <!-- Left Side End --> */}
        <div className='w-3/4 '>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Menu;
