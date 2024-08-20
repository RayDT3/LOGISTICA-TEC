import { Router } from 'express';   
import { deleteCategoria, getCategoria, getCategorias, postCategoria, updateCategoria } from '../controllers/categorias';

const router = Router();

router.get('/', getCategorias);
router.get('/:id', getCategoria);
router.delete('/:id', deleteCategoria);
router.post('/', postCategoria);
router.put('/:id', updateCategoria);

export default router;