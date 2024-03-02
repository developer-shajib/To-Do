import { Link } from 'react-router-dom';
import { GiSecretBook } from 'react-icons/gi';
import { IoIosArrowForward } from 'react-icons/io';

const Header = () => {
  return (
    <>
      <div className=' sticky top-0  z-50 w-full mx-auto bg-slate-100 flex items-center border-b-2  border-slate-200'>
        <Link
          className='flex justify-center gap-2 items-center w-1/4 text-3xl text-slate-500 border-r-2  border-slate-200 py-2'
          to={'#'}>
          <GiSecretBook /> Task
        </Link>

        <div className='w-3/4 pl-10'>
          <ul className='flex items-center gap-4 text-slate-500'>
            <li className='flex items-center gap-2 text-lg'>
              Workspace <IoIosArrowForward className='text-sm' />
            </li>
            <li className='flex items-center gap-2 text-lg'>
              Project <IoIosArrowForward className='text-sm' />
            </li>
            <li className='flex items-center gap-2 text-lg'>Real State Borading</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
