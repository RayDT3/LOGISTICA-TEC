import { Router } from 'express';   
import { deleteReceta, getReceta, getRecetas, postReceta, updateReceta } from '../controllers/recetas';

const router = Router();

router.get('/', getRecetas);
router.get('/:id', getReceta);
router.delete('/:id', deleteReceta);
router.post('/', postReceta);
router.put('/:id', updateReceta);

export default router;