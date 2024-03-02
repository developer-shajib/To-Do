import express from 'express';
import tokenVerify from '../middlewares/tokenVerify.js';
import { create, project, singProject, update } from '../controllers/projectController.js';

const router = express.Router();

router.use(tokenVerify);

// create route
router.route('/').get(project).post(create);
router.route('/:id').get(singProject).put(update).patch(update);

// export default router
export default router;
