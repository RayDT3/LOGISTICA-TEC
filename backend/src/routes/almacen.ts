import { Router } from 'express';
import { deleteAlmacen, getAlmacen, getAlmacenes, postAlmacen, updateAlmacen } from '../controllers/almacen';

const router = Router();

router.get('/', getAlmacenes);
router.get('/:id', getAlmacen);
router.delete('/:id', deleteAlmacen);
router.post('/', postAlmacen);
router.put('/:id', updateAlmacen);

export default router;
