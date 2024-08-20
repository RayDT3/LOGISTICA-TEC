import { Request, Response } from 'express';
import Ingrediente from '../models/ingredientes';

export const getIngredientes = async (req: Request, res: Response) => {
    try {
        const ingredientes = await Ingrediente.findAll();
        res.json(ingredientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los ingredientes' });
    }
}

export const getIngrediente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ingrediente = await Ingrediente.findByPk(id);
        if (ingrediente) {
            res.json(ingrediente);
        } else {
            res.status(404).json({ message: `No existe un ingrediente con el id ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el ingrediente' });
    }
}

export const deleteIngrediente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ingrediente = await Ingrediente.findByPk(id);
        if (!ingrediente) {
            res.status(404).json({ message: `No existe un ingrediente con el id ${id}` });
        } else {
            await ingrediente.destroy();
            res.json({ message: 'El ingrediente fue eliminado con éxito' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el ingrediente' });
    }
}

export const postIngrediente = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        await Ingrediente.create(body);
        res.json({ message: 'El ingrediente fue creado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el ingrediente' });
    }
}

export const updateIngrediente = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const ingrediente = await Ingrediente.findByPk(id);
        if (!ingrediente) {
            res.status(404).json({ message: `No existe un ingrediente con el id ${id}` });
        } else {
            await ingrediente.update(body);
            res.json({ message: 'El ingrediente fue actualizado con éxito' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el ingrediente' });
    }
}
