import { Request, Response } from 'express';
import Pedido from '../models/pedidos';
import Ingrediente from '../models/ingredientes';

export const getPedidos = async (req: Request, res: Response) => {
    try {
        const pedidos = await Pedido.findAll();
        res.json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los pedidos' });
    }
}

export const getPedido = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ message: `No existe un pedido con el id ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el pedido' });
    }
}

export const deletePedido = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            res.status(404).json({ message: `No existe un pedido con el id ${id}` });
        } else {
            await pedido.destroy();
            res.json({ message: 'El pedido fue eliminado con éxito' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el pedido' });
    }
}

export const postPedido = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        await Pedido.create(body);
        res.json({ message: 'El pedido fue creado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el pedido' });
    }
}

export const updatePedido = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            res.status(404).json({ message: `No existe un pedido con el id ${id}` });
        } else {
            await pedido.update(body);
            res.json({ message: 'El pedido fue actualizado con éxito' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el pedido' });
    }
}
