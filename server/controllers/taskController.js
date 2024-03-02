import expressAsyncHandler from 'express-async-handler';
import Task from '../models/Task.js';
import { createSlug } from '../helpers/helper.js';
import Project from '../models/Project.js';

/**
 * @DESC GET all Task
 * @ROUTE /api/v1/task
 * @method GET
 * @access public
 */
export const task = expressAsyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks, message: 'Tasks fetch success' });
});

/**
 * @DESC GET Single  Task
 * @ROUTE /api/v1/task/id
 * @method GET
 * @access public
 */
export const singleTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(400).json({ error: 'Task not found' });
  res.status(200).json({ task, message: 'Tasks fetch success' });
});

/**
 * @DESC Create A  Task
 * @ROUTE /api/v1/task
 * @method POST
 * @access public
 */
export const createTask = expressAsyncHandler(async (req, res) => {
  // get values
  const { projectId, title, description, assignee, priority, taskStatus, date, category } = req.body;

  if (!projectId || !title || !description || !priority || !taskStatus || !date || !category) return res.status(400).json({ error: 'All fields are required!' });

  //   create new task
  const task = await Task.create({
    title,
    description,
    priority,
    taskStatus,
    date,
    assignee: [...assignee, req.me._id],
    category
  });

  if (task.taskStatus === 'To Do') {
    await Project.findByIdAndUpdate(projectId, { $push: { todo: task._id } });
  }
  if (task.taskStatus === 'In Progress') {
    await Project.findByIdAndUpdate(projectId, { $push: { inProgress: task._id } });
  }

  if (task.taskStatus === 'Completed') {
    await Project.findByIdAndUpdate(projectId, { $push: { completed: task._id } });
  }

  res.status(200).json({ task, message: 'New task created success' });
});

/**
 * @DESC Update A  Task
 * @ROUTE /api/v1/task/id
 * @method PUT/PATCH
 * @access public
 */
export const update = expressAsyncHandler(async (req, res) => {
  const userData = req.body;
  const { id } = req.params;

  const findTask = await Task.findById(id);
  if (!findTask) return res.status(400).json({ error: 'Task not found' });

  let slug = findTask.slug;
  if (req.body.title) {
    slug = createSlug(req.body.title);
  }

  const cleanedData = Object.fromEntries(Object.entries(userData).filter(([_, v]) => v !== ''));

  const updatedData = {
    ...cleanedData,
    slug
  };

  //   create new task
  const task = await Task.findByIdAndUpdate(
    id,
    {
      $set: updatedData
    },
    {
      new: true
    }
  );

  res.status(200).json({ task, message: 'Task updated success' });
});

/**
 * @DESC Search Task
 * @ROUTE /api/v1/task/search
 * @method GET
 * @access public
 */
export const search = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.keyword;

  const task = await Task.find({ $or: [{ title: { $regex: keyword, $options: 'i' } }, { description: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }, { priority: { $regex: keyword, $options: 'i' } }] });

  return res.status(200).json({ task, message: 'Task find success' });
});
