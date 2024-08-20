import { Router } from 'express';
import { deleteUser, getUser, getUsers, loginUser, newUser } from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.post('/', newUser);
router.post('/login', loginUser)

export default router;