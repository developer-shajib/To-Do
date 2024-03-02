import expressAsyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import { createSlug } from '../helpers/helper.js';

/**
 * @DESC GET all projects
 * @ROUTE /api/v1/project
 * @method GET
 * @access public
 */
export const project = expressAsyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({ projects, message: 'Project fetch success' });
});

/**
 * @DESC GET Single Project
 * @ROUTE /api/v1/project
 * @method GET
 * @access public
 */
export const singProject = expressAsyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) return res.status(400).json({ error: 'Project not found!' });

  res.status(200).json({ project, message: 'Project fetch success' });
});

/**
 * @DESC Create a Project
 * @ROUTE /api/v1/project
 * @method POST
 * @access public
 */
export const create = expressAsyncHandler(async (req, res) => {
  // get values
  const { name } = req.body;

  // validations
  if (!name) {
    return res.status(400).json({ error: 'Project name is required' });
  }

  //   create new project
  const project = await Project.create({
    name,
    slug: createSlug(name)
  });

  res.status(200).json({ project, message: 'Project created success' });
});

/**
 * @DESC Update a Project
 * @ROUTE /api/v1/project
 * @method PUT/PATCH
 * @access public
 */
export const update = expressAsyncHandler(async (req, res) => {
  const userData = req.body;
  const { id } = req.params;

  const findProject = await Project.findById(id);
  if (!findProject) return res.status(400).json({ error: 'Project not found' });

  let slug = findProject.slug;
  if (req.body.name) {
    slug = createSlug(req.body.name);
  }

  const cleanedData = Object.fromEntries(Object.entries(userData).filter(([_, v]) => v !== ''));

  const updatedData = {
    ...cleanedData,
    slug
  };

  //   create new project
  const project = await Project.findByIdAndUpdate(
    id,
    {
      $set: updatedData
    },
    {
      new: true
    }
  );

  res.status(200).json({ project, message: 'Project updated success' });
});
