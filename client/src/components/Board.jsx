import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiMessage2Line } from 'react-icons/ri';
import { FaRegClock } from 'react-icons/fa6';
import Modal from '../components/Modal.jsx';
import { HiOutlineUsers } from 'react-icons/hi2';
import Avatar from '../assets/images/avatar.jpg';
import { RxCross2 } from 'react-icons/rx';
import { IoPricetagOutline } from 'react-icons/io5';
import { IoIosStats } from 'react-icons/io';
import { BsCalendar2Date } from 'react-icons/bs';
import { PiSubtitlesLight } from 'react-icons/pi';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { BiCategoryAlt } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import useFormFields from '../hooks/useFormFieldsHook.jsx';
import createToast from '../utils/createToast.jsx';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../features/auth/authApiSlice.js';
import { addNewData, getAllAuthData } from '../features/auth/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Board = () => {
  const [modal, setModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { input, setInput, handleInputChange } = useFormFields({ title: '', description: '', priority: '', category: '', taskStatus: '', date: '', assignee: [] });
  const [createTask, { error, data, isLoading }] = useCreateTaskMutation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tasks } = useSelector(getAllAuthData);
  const [drawerData, setDrawerData] = useState(null);
  const [updateTask, { error: updateTaskError, data: updateTaskData }] = useUpdateTaskMutation();

  const toDoTask = tasks?.filter((item) => item.taskStatus === 'To Do');
  const inProgress = tasks?.filter((item) => item.taskStatus === 'In Progress');
  const completed = tasks?.filter((item) => item.taskStatus === 'Completed');

  // Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input.title || !input.description || !input.priority || !input.category || !input.taskStatus || !input.date) return createToast('All fields are required');

    dispatch(createTask({ ...input, projectId: id }));
  };

  // Task Update
  const handleTaskUpdate = (data) => {
    dispatch(updateTask({ id: drawerData?._id, data }));
  };

  useEffect(() => {
    if (error) {
      return createToast(error.data.error);
    }
    if (data) {
      dispatch(addNewData({ task: data.task }));
      createToast(data.message, 'success');
      setInput((prevState) => ({ ...prevState, title: '', description: '', priority: '', category: '', taskStatus: '', date: '', assignee: [] }));
    }
  }, [error, data, setInput, dispatch]);

  useEffect(() => {
    if (updateTaskData) {
      setDrawerData(updateTaskData?.task);
    }
  }, [updateTaskData]);
  return (
    <>
      {/* <!-- Modal Start --> */}
      {/* <!-- create Task Modal --> */}
      <Modal
        isOpen={modal}
        onClose={() => setModal(!modal)}>
        <div>
          <h1 className='font-bold text-slate-500'>Add New Task</h1>
          <form
            onSubmit={handleFormSubmit}
            action=''
            className='px-2'>
            <div className='flex gap-14 pt-5 justify-between'>
              <div className='flex gap-2 text-lg items-center'>
                <PiSubtitlesLight /> Title
              </div>
              <div className='flex flex-wrap gap-2 '>
                <input
                  name='title'
                  value={input.title}
                  onChange={handleInputChange}
                  placeholder='title'
                  className='border-2 border-slate-400 rounded-md px-2 outline-none w-80'
                  type='text'
                />
              </div>
            </div>
            <div className='flex gap-14 pt-5 justify-between'>
              <div className='flex gap-2 text-lg items-center'>
                <PiSubtitlesLight /> Description
              </div>
              <div className='flex flex-wrap gap-2 '>
                <textarea
                  name='description'
                  value={input.description}
                  onChange={handleInputChange}
                  id=''
                  cols='30'
                  rows='2'
                  placeholder='type description'
                  className='border-2 border-slate-400 rounded-md px-2 outline-none w-80'></textarea>
              </div>
            </div>
            <div className='flex gap-14 pt-10 justify-between'>
              <div className='flex gap-2 text-lg items-center'>
                <HiOutlineUsers /> Assignee
              </div>
              <div className='flex flex-wrap gap-2 justify-end'>
                <div className='flex items-center gap-2 bg-slate-200 px-2 py-1 rounded-full'>
                  <img
                    className='h-6 w-6 rounded-full'
                    src={Avatar}
                    alt='img'
                  />
                  <span>Shajibul Islam</span>
                  <span>
                    <RxCross2 />
                  </span>
                </div>
                <div className='flex items-center gap-2 bg-slate-200 px-2 py-1 rounded-full'>
                  <img
                    className='h-6 w-6 rounded-full'
                    src={Avatar}
                    alt='img'
                  />
                  <span>Shajibul Islam</span>
                  <button>
                    <RxCross2 />
                  </button>
                </div>
                <div className='flex items-center gap-2 bg-slate-200 px-2 py-1 rounded-full'>
                  <img
                    className='h-6 w-6 rounded-full'
                    src={Avatar}
                    alt='img'
                  />
                  <span>Shajibul Islam</span>
                  <button>
                    <RxCross2 />
                  </button>
                </div>
                <button
                  onClick={(e) => setAssignModal(true)}
                  className='rounded-full h-4 w-4 leading-4  flex items-center justify-center p-4 bg-slate-200 text-xl hover:bg-slate-300 transition-all duration-300'>
                  +
                </button>
              </div>
            </div>
            <div className='flex gap-14 pt-5 justify-between'>
              <div className='flex gap-2 text-lg items-center'>
                <IoPricetagOutline /> Priority
              </div>
              <div className='flex flex-wrap gap-2 '>
                <select
                  className='border-2 border-slate-400 rounded-full px-2'
                  name='priority'
                  value={input.priority}
                  onChange={handleInputChange}
                  id=''>
                  <option
                    selected
                    value='Normal'>
                    Normal
                  </option>
                  <option value='Mid'>Mid</option>
                  <option value='High'>High</option>
                </select>
              </div>
            </div>
            <div className='flex gap-14 pt-5 justify-between'>
              <div className='flex gap-2 text-lg items-center'>
                <BiCategoryAlt /> Category
              </div>
              <div className='flex flex-wrap gap-2 '>
                <select
                  id='category '
                  name='category'
                  value={input.category}
                  onChange={handleInputChange}
                  className='rounded-full border-2 border-slate-200 py-1 px-2 text-slate-600 outline-none cursor-pointer'>
                  <option
                    selected
                    value='Bug'>
                    Bug
                  </option>
                  <option value='Create'>Create</option>
                  <option value='Error'>Error</option>
                  <option value='Solved'>Solved</option>
                </select>
              </div>
            </div>
            <div className='flex gap-14 pt-5 justify-between'>
              <div className='flex gap-2 text-lg items-center'>
                <IoIosStats /> Status
              </div>
              <div className='flex flex-wrap gap-2'>
                <select
                  name='taskStatus'
                  value={input.taskStatus}
                  onChange={handleInputChange}
                  className='border-2 border-slate-400 rounded-full px-2'
                  id=''>
                  <option value='To Do'>To Do</option>
                  <option value='In Progress'>In Progress</option>
                  <option value='Completed'>Completed</option>
                </select>
              </div>
            </div>
            <div className='flex gap-14 pt-5 justify-between'>
              <div className='flex gap-2 text-lg items-center'>
                <BsCalendar2Date /> Date
              </div>
              <div className='flex flex-wrap gap-2 '>
                <input
                  name='date'
                  value={input.date}
                  onChange={handleInputChange}
                  className='border-2 border-slate-400 rounded-full px-2 outline-none'
                  type='date'
                />
              </div>
            </div>

            <div className='w-full flex justify-center'>
              <button
                className='bg-blue-500 hover:bg-blue-400 transition-all duration-300 px-14 py-1 text-xl rounded-md text-white mt-5'
                type='submit'>
                {isLoading ? 'Loading ...' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {/* <!-- Assignee Modal --> */}
      <Modal
        isOpen={assignModal}
        onClose={() => setAssignModal(!assignModal)}>
        <div>
          <h1 className='font-bold text-slate-500'>Assign User</h1>
        </div>
      </Modal>
      {/* <!-- Modal End --> */}

      {/* <!--  Board --> */}
      <div className='flex '>
        <div className='bg-slate-300 w-1/3 rounded p-2 pb-12'>
          <div className=' shadow gap-2 flex flex-col '>
            <p className='flex items-center justify-between px-6 border-slate-200 border text-md w-full bg-white py-2  gap-2 font-medium rounded-md'>
              To-Do
              <button>
                <BsThreeDotsVertical className='text-sm' />
              </button>
            </p>
            <button
              onClick={() => setModal(!modal)}
              className='flex items-center justify-center px-6 border text-md w-full bg-white py-1 text-slate-500  gap-2  rounded-md border-dotted  border-slate-500 hover:bg-slate-200 transition-all duration-300 '>
              + Add New Task
            </button>

            {/* <!-- Task List --> */}
            <div className='pt-2 flex flex-col gap-2'>
              {toDoTask?.length > 0 &&
                toDoTask?.map((item) => (
                  <button
                    key={item?._id}
                    onClick={() => {
                      setDrawerData(item);
                      onOpen();
                    }}
                    className='border-b-2 border-slate-200 bg-white p-4 rounded'>
                    <div className='flex justify-between mb-2'>
                      <p className='font-medium text-lg'>{item?.title}</p>
                      <div className='flex gap-2'>
                        <span className='text-orange-600 border-2 border-orange-600 rounded-full px-2 text-sm'>{item?.category}</span>
                        <span className='text-blue-500 border-2 border-blue-500 rounded-full px-2 text-sm'>{item?.priority}</span>
                      </div>
                    </div>
                    <p className='text-slate-600 pb-3 text-left'>{item?.description?.length > 80 ? item?.description?.substring(0, 80) + '...' : item?.description}.</p>
                    <div className='flex justify-end gap-4 border-t-2 border-slate-300 pt-3'>
                      <button className='flex gap-2 items-center'>
                        <RiMessage2Line />
                        <span>4</span>
                      </button>
                      <button className='flex gap-2 items-center'>
                        <FaRegClock />
                        <span>2h</span>
                      </button>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
        {/* <!-- Task Side Bar Start --> */}
        {drawerData && (
          <Drawer
            placement={'right'}
            onClose={onClose}
            isOpen={isOpen}
            size={'sm'}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth='1px'>
                <div className='flex justify-between items-center text-slate-500'>
                  <div>{drawerData?.title}</div>
                  <button>
                    <HiOutlineDotsVertical />
                  </button>
                </div>
              </DrawerHeader>
              <DrawerBody>
                <div className='flex gap-14 pt-2 justify-between'>
                  <div className='flex gap-2 text-lg items-center'>
                    <HiOutlineUsers /> Assigned
                  </div>
                  <div className='flex flex-wrap gap-2 justify-end '>
                    <div className='flex items-center gap-2 bg-slate-200 px-2 py-1 rounded-full'>
                      <img
                        className='h-6 w-6 rounded-full'
                        src={Avatar}
                        alt='img'
                      />
                      <span>Shajibul Islam</span>
                    </div>
                    <div className='flex items-center gap-2 bg-slate-200 px-2 py-1 rounded-full'>
                      <img
                        className='h-6 w-6 rounded-full'
                        src={Avatar}
                        alt='img'
                      />
                      <span>Shajibul Islam</span>
                    </div>
                    <div className='flex items-center gap-2 bg-slate-200 px-2 py-1 rounded-full'>
                      <img
                        className='h-6 w-6 rounded-full'
                        src={Avatar}
                        alt='img'
                      />
                      <span>Shajibul Islam</span>
                    </div>
                  </div>
                </div>
                <div className='flex gap-14 pt-5 justify-between'>
                  <div className='flex gap-2 text-lg items-center'>
                    <IoPricetagOutline /> Priority
                  </div>
                  <div className='flex flex-wrap gap-2 '>
                    <select
                      className='border-2 border-slate-400 rounded-full px-2'
                      name=''
                      id=''
                      onChange={(e) => handleTaskUpdate({ priority: e.target.value })}>
                      <option
                        selected={drawerData?.priority === 'Normal' ? true : false}
                        value='Normal'>
                        Normal
                      </option>
                      <option
                        selected={drawerData?.priority === 'Mid' ? true : false}
                        value='Mid'>
                        Mid
                      </option>
                      <option
                        selected={drawerData?.priority === 'High' ? true : false}
                        value='High'>
                        High
                      </option>
                    </select>
                  </div>
                </div>
                <div className='flex gap-14 pt-5 justify-between'>
                  <div className='flex gap-2 text-lg items-center'>
                    <BiCategoryAlt /> Category
                  </div>
                  <div className='flex flex-wrap gap-2 '>
                    <select
                      id='categories '
                      className='border-2 border-slate-400 rounded-full px-2'
                      onChange={(e) => handleTaskUpdate({ category: e.target.value })}>
                      <option
                        selected={drawerData?.category === 'Bug' ? true : false}
                        value='Bug'>
                        Bug
                      </option>
                      <option
                        selected={drawerData?.category === 'Create' ? true : false}
                        value='Create'>
                        Create
                      </option>
                      <option
                        selected={drawerData?.category === 'Error' ? true : false}
                        value='Error'>
                        Error
                      </option>
                      <option
                        selected={drawerData?.category === 'Solved' ? true : false}
                        value='Solved'>
                        Solved
                      </option>
                    </select>
                  </div>
                </div>
                <div className='flex gap-14 pt-5 justify-between'>
                  <div className='flex gap-2 text-lg items-center'>
                    <IoIosStats /> Status
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    <select
                      className='border-2 border-slate-400 rounded-full px-2'
                      name=''
                      id=''
                      onChange={(e) => handleTaskUpdate({ taskStatus: e.target.value })}>
                      <option
                        selected={drawerData?.taskStatus === 'To Do' ? true : false}
                        value='To Do'>
                        To Do
                      </option>
                      <option
                        selected={drawerData?.taskStatus === 'In Progress' ? true : false}
                        value='In Progress'>
                        In Progress
                      </option>
                      <option
                        selected={drawerData?.taskStatus === 'Complete' ? true : false}
                        value='Completed'>
                        Completed
                      </option>
                    </select>
                  </div>
                </div>
                <div className='flex gap-14 pt-5 justify-between'>
                  <div className='flex gap-2 text-lg items-center'>
                    <BsCalendar2Date /> Date
                  </div>
                  <div className='flex flex-wrap gap-2 '>
                    <span>March 27-28, 2024</span>
                  </div>
                </div>
                <Tabs
                  className='mt-6'
                  variant='enclosed'>
                  <TabList>
                    <Tab>Description</Tab>
                    <Tab>Comments</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <p>{drawerData?.description}</p>
                    </TabPanel>
                    <TabPanel>
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 flex-col'>
                          <div className='bg-slate-100 p-2 rounded-md flex  items-center gap-4'>
                            <img
                              className='w-6 h-6 rounded-full'
                              src={Avatar}
                              alt='avatar'
                            />
                            <div className='flex flex-col'>
                              <div className='flex items-center gap-2'>
                                <p>Shajibul Islam</p>
                                <span>. 4h ago</span>
                              </div>

                              <p>Nice job</p>
                            </div>
                          </div>
                          <div className='bg-slate-100 p-2 rounded-md flex  items-center gap-4'>
                            <img
                              className='w-6 h-6 rounded-full'
                              src={Avatar}
                              alt='avatar'
                            />
                            <div className='flex flex-col'>
                              <div className='flex items-center gap-2'>
                                <p>Shajibul Islam</p>
                                <span>. 4h ago</span>
                              </div>

                              <p>Nice job</p>
                            </div>
                          </div>
                        </div>
                        <div className='bg-slate-200 p-2'>
                          <form
                            action=''
                            className='flex justify-between'>
                            <input
                              className='w-3/4 border-2 border-slate-200 px-2 rounded-md py-1  outline-none'
                              type='text'
                              placeholder='type comment'
                            />
                            <button
                              className='1/4 bg-blue-500 hover:bg-blue-400 transition-all duration-300 rounded-lg px-2 text-white text-sm'
                              type='submit'>
                              Comment
                            </button>
                          </form>
                        </div>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
        {/* <!-- Task Side Bar End --> */}

        <div className='bg-slate-300 w-1/3 rounded p-2 pb-12'>
          <div className=' shadow gap-2 flex flex-col '>
            <p className='flex items-center justify-between px-6 border-slate-200 border text-md w-full bg-white py-2  gap-2 font-medium rounded-md'>
              In Progress
              <button>
                <BsThreeDotsVertical className='text-sm' />
              </button>
            </p>

            {/* <!-- Task List --> */}
            <div className='pt-2 flex flex-col gap-2'>
              {inProgress?.length > 0 &&
                inProgress?.map((item) => (
                  <button
                    key={item?._id}
                    onClick={() => {
                      setDrawerData(item);
                      onOpen();
                    }}
                    className='border-b-2 border-slate-200 bg-white p-4 rounded'>
                    <div className='flex justify-between mb-2'>
                      <p className='font-medium text-lg'>{item?.title}</p>
                      <div className='flex gap-2'>
                        <span className='text-orange-600 border-2 border-orange-600 rounded-full px-2 text-sm'>{item?.category}</span>
                        <span className='text-blue-500 border-2 border-blue-500 rounded-full px-2 text-sm'>{item?.priority}</span>
                      </div>
                    </div>
                    <p className='text-slate-600 pb-3 text-left'>{item?.description?.length > 80 ? item?.description?.substring(0, 80) + '...' : item?.description}.</p>
                    <div className='flex justify-end gap-4 border-t-2 border-slate-300 pt-3'>
                      <button className='flex gap-2 items-center'>
                        <RiMessage2Line />
                        <span>4</span>
                      </button>
                      <button className='flex gap-2 items-center'>
                        <FaRegClock />
                        <span>2h</span>
                      </button>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className='bg-slate-300 w-1/3 rounded p-2 pb-12'>
          <div className=' shadow gap-2 flex flex-col '>
            <p className='flex items-center justify-between px-6 border-slate-200 border text-md w-full bg-white py-2  gap-2 font-medium rounded-md'>
              Completed
              <button>
                <BsThreeDotsVertical className='text-sm' />
              </button>
            </p>

            {/* <!-- Task List --> */}
            <div className='pt-2 flex flex-col gap-2'>
              {completed?.length > 0 &&
                completed?.map((item) => (
                  <button
                    key={item?._id}
                    onClick={() => {
                      setDrawerData(item);
                      onOpen();
                    }}
                    className='border-b-2 border-slate-200 bg-white p-4 rounded'>
                    <div className='flex justify-between mb-2'>
                      <p className='font-medium text-lg'>{item?.title}</p>
                      <div className='flex gap-2'>
                        <span className='text-orange-600 border-2 border-orange-600 rounded-full px-2 text-sm'>{item?.category}</span>
                        <span className='text-blue-500 border-2 border-blue-500 rounded-full px-2 text-sm'>{item?.priority}</span>
                      </div>
                    </div>
                    <p className='text-slate-600 pb-3 text-left'>{item?.description?.length > 80 ? item?.description?.substring(0, 80) + '...' : item?.description}.</p>
                    <div className='flex justify-end gap-4 border-t-2 border-slate-300 pt-3'>
                      <button className='flex gap-2 items-center'>
                        <RiMessage2Line />
                        <span>4</span>
                      </button>
                      <button className='flex gap-2 items-center'>
                        <FaRegClock />
                        <span>2h</span>
                      </button>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
