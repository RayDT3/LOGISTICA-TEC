import { Router } from 'express';
import { deletePedido, getPedido, getPedidos, postPedido, updatePedido } from '../controllers/pedidos';

const router = Router();

router.get('/', getPedidos);
router.get('/:id', getPedido);
router.delete('/:id', deletePedido);
router.post('/', postPedido);
router.put('/:id', updatePedido);

export default router;
