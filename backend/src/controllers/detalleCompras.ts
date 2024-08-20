import { Request, Response } from 'express';
import DetalleCompra from '../models/detalleCompras';


export const getDetalleCompras = async (req: Request, res: Response) => {
    const listDetalleCompras = await DetalleCompra.findAll()

    res.json(listDetalleCompras)
}

export const getDetalleCompra = async (req: Request, res: Response) => {
    const { id } = req.params;
    const detalleCompra = await DetalleCompra.findByPk(id);

    if (detalleCompra) {
        res.json(detalleCompra)
    } else {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        })
    }
}

export const deleteDetalleCompra = async (req: Request, res: Response) => {
    const { id } = req.params;
    const detalleCompra = await DetalleCompra.findByPk(id);

    if (!detalleCompra) {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        })
    } else {
        await detalleCompra.destroy();
        res.json({
            msg: 'El registro fue eliminado con exito!'
        })
    }

}

export const postDetalleCompra = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await DetalleCompra.create(body);

        res.json({
            msg: `El registro fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateDetalleCompra = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const detalleCompra = await DetalleCompra.findByPk(id);

    if(detalleCompra) {
        await detalleCompra.update(body);
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