import { Router } from 'express';   
import { deleteDetalleReceta, getDetalleReceta, getDetalleRecetas, postDetalleReceta, updateDetalleReceta } from '../controllers/detalleReceta';

const router = Router();

router.get('/', getDetalleRecetas);
router.get('/:id', getDetalleReceta);
router.delete('/:id', deleteDetalleReceta);
router.post('/', postDetalleReceta);
router.put('/:id', updateDetalleReceta);

export default router;