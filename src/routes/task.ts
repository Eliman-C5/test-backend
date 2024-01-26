import { Router } from 'express';
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByUserId,
  getUsers,
} from '../controllers/TaskController';

const router = Router();

router.get('/users', getUsers);
router.get('/get', getTask);
router.get('/get/:id', getTasksByUserId);
router.post('/create', createTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export default router;

// app.get('/task', (req, res) => {

// });
