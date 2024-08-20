import { Request, Response } from 'express';
import Almacen from '../models/almacen';

export const getAlmacenes = async (req: Request, res: Response) => {
    const listAlmacenes = await Almacen.findAll();
    res.json(listAlmacenes);
};

export const getAlmacen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const almacen = await Almacen.findByPk(id);

    if (almacen) {
        res.json(almacen);
    } else {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        });
    }
};

export const deleteAlmacen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const almacen = await Almacen.findByPk(id);

    if (!almacen) {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        });
    } else {
        await almacen.destroy();
        res.json({
            msg: 'El registro fue eliminado con exito!'
        });
    }
};

export const postAlmacen = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Almacen.create(body);
        res.json({
            msg: `El registro fue agregado con exito!`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        });
    }
};

export const updateAlmacen = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const almacen = await Almacen.findByPk(id);

        if (almacen) {
            await almacen.update(body);
            res.json({
                msg: 'El registro fue actualizado con exito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un registro con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        });
    }
};
