import Board from '../components/Board.jsx';
import { useEffect, useState } from 'react';
import Overview from '../components/Overview.jsx';
import { useSearchTaskMutation } from '../features/auth/authApiSlice.js';
import { useDispatch } from 'react-redux';
import { setUserData } from '../features/auth/authSlice.js';

const Project = () => {
  const [open, setOpen] = useState('Board');
  const [keyword, setKeyword] = useState('');
  const [searchTask, { error, data }] = useSearchTaskMutation(keyword);
  const dispatch = useDispatch();

  // Search Form submit handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(searchTask(keyword));
  };

  useEffect(() => {
    if (data) {
      dispatch(setUserData({ tasks: data.task }));
    }
  }, [dispatch, data]);

  return (
    <>
      <div>
        {/* <!-- Search Filter --> */}
        <div className='flex justify-between px-10 p-7 '>
          <div className='flex gap-4'>
            <select
              id='categories '
              className='rounded-full border-2 border-slate-200 py-1 px-2 text-slate-600 outline-none cursor-pointer'>
              <option>Categories</option>
              <option value='Bug'>Bug</option>
              <option value='Create'>Create</option>
              <option value='Error'>Error</option>
              <option value='Solved'>Solved</option>
            </select>

            <select
              id='priorities '
              className='rounded-full border-2 border-slate-200 py-1 px-2 text-slate-600 outline-none cursor-pointer'>
              <option>Priorities</option>
              <option value='saab'>Saab</option>
              <option value='mercedes'>Mercedes</option>
              <option value='audi'>Audi</option>
            </select>

            <select
              id='dates '
              className='rounded-full border-2 border-slate-200 py-1 px-2 text-slate-600 outline-none cursor-pointer'>
              <option>Dates</option>
              <option value='saab'>Saab</option>
              <option value='mercedes'>Mercedes</option>
              <option value='audi'>Audi</option>
            </select>
          </div>
          <div>
            <form
              onSubmit={handleSearchSubmit}
              action=''
              className='flex gap-2'>
              <input
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                type='search'
                placeholder='Search...'
                className='bg-slate-100 shadow rounded-lg outline-none py-1 px-3'
              />
              <button
                className='bg-blue-400 hover:bg-blue-600 transition-all duration-300 text-white rounded-lg  px-4'
                type='submit'>
                Search
              </button>
            </form>
          </div>
        </div>

        {/* <!-- Overview & Board   --> */}
        <div>
          <div className='flex justify-between border-b-2 border-slate-200 px-10 mt-4 '>
            <div className='flex gap-10 '>
              <button
                onClick={() => setOpen('Overview')}
                className='text-slate-600 hover:text-blue-400 hover:border-b-2 border-blue-400 transition-all duration-300 text-lg pb-2'>
                Overview
              </button>
              <button
                onClick={() => setOpen('Board')}
                className='text-blue-400 border-b-2    hover:text-blue-400 hover:border-b-2 border-blue-400 transition-all duration-300 text-lg pb-2'>
                Board
              </button>
            </div>
          </div>

          {open === 'Board' ? <Board /> : <Overview />}
        </div>
      </div>
    </>
  );
};

export default Project;
