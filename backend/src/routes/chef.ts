import { Router } from 'express';   
import { deleteChef, getChef, getChefs, postChef, updateChef } from '../controllers/chef';

const router = Router();

router.get('/', getChefs);
router.get('/:id', getChef);
router.delete('/:id', deleteChef);
router.post('/', postChef);
router.put('/:id', updateChef);

export default router;