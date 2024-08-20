import { Request, Response } from 'express';
import Recetas from '../models/recetas';


export const getRecetas = async (req: Request, res: Response) => {
    const listRecetas = await Recetas.findAll()

    res.json(listRecetas)
}

export const getReceta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const receta = await Recetas.findByPk(id);

    if (receta) {
        res.json(receta)
    } else {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        })
    }
}

export const deleteReceta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const receta = await Recetas.findByPk(id);

    if (!receta) {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        })
    } else {
        await receta.destroy();
        res.json({
            msg: 'El registro fue eliminado con exito!'
        })
    }

}

export const postReceta = async (req: Request, res: Response) => {
    const { body } = req;

    try {

        const receta = await Recetas.create(body);
        res.json(receta);
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateReceta = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const receta = await Recetas.findByPk(id);

    if(receta) {
        await receta.update(body);
        res.json({
            msg: 'El registro fue actualziado con exito'
        })

    } else {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        })
    }
        
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }

    
}