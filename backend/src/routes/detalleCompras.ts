import { Router } from 'express';   
import { deleteDetalleCompra, getDetalleCompra, getDetalleCompras, postDetalleCompra, updateDetalleCompra } from '../controllers/detalleCompras';

const router = Router();

router.get('/', getDetalleCompras);
router.get('/:id', getDetalleCompra);
router.delete('/:id', deleteDetalleCompra);
router.post('/', postDetalleCompra);
router.put('/:id', updateDetalleCompra);

export default router;