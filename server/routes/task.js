import express from 'express';
import tokenVerify from '../middlewares/tokenVerify.js';
import { createTask, search, singleTask, task, update } from '../controllers/taskController.js';

const router = express.Router();

router.use(tokenVerify);

// create route
router.route('/').get(task).post(createTask);
router.route('/:id').get(singleTask).put(update).patch(update);
router.route('/search').post(tokenVerify, search);

// export default router
export default router;
