import { Router } from 'express';
import { deleteIngrediente, getIngrediente, getIngredientes, postIngrediente, updateIngrediente } from '../controllers/ingrediente';

const router = Router();

router.get('/', getIngredientes);
router.get('/:id', getIngrediente);
router.delete('/:id', deleteIngrediente);
router.post('/', postIngrediente);
router.put('/:id', updateIngrediente);

export default router;
