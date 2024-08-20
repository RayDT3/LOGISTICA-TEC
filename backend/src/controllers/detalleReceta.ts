import { Request, Response } from 'express';
import DetalleRecetas from '../models/detalleReceta';


export const getDetalleRecetas = async (req: Request, res: Response) => {
    const listDetalleRecetas = await DetalleRecetas.findAll()

    res.json(listDetalleRecetas)
}

export const getDetalleReceta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const detalleReceta = await DetalleRecetas.findByPk(id);

    if (detalleReceta) {
        res.json(detalleReceta)
    } else {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        })
    }
}

export const deleteDetalleReceta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const detalleReceta = await DetalleRecetas.findByPk(id);

    if (!detalleReceta) {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        })
    } else {
        await detalleReceta.destroy();
        res.json({
            msg: 'El registro fue eliminado con exito!'
        })
    }

}

export const postDetalleReceta = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const detalleRecetaCreado = await DetalleRecetas.create(body);
        res.json(detalleRecetaCreado);
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateDetalleReceta = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const detalleReceta = await DetalleRecetas.findByPk(id);

    if(detalleReceta) {
        await detalleReceta.update(body);
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