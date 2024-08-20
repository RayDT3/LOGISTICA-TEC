import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import  User  from '../models/users';
import jwt from 'jsonwebtoken';

export const getUsers = async (req: Request, res: Response) => {
    const listUsers = await User.findAll()

    res.json(listUsers)
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        })
    } else {
        await user.destroy();
        res.json({
            msg: 'El registro fue eliminado con exito!'
        })
    }

}

export const postUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await User.create(body);

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

export const updateUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const user = await User.findByPk(id);

    if(user) {
        await user.update(body);
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

export const newUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    // Validamos si el usuario ya existe en la base de datos
    const user = await User.findOne({ where: { username: username } });

    if(user) {
       return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        })
    } 
 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        // Guardarmos usuario en la base de datos
        await User.create({
            username: username,
            password: hashedPassword
        })
    
        res.json({
            msg: `Usuario ${username} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

   // Validamos si el usuario existe en la base de datos
   const user: any = await User.findOne({ where: { username: username } });

   if(!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base datos`
        })
   }

   // Validamos password
   const passwordValid = bcrypt.compare(password, user.password)
   if(!passwordValid) {
    return res.status(400).json({
        msg: `Contraseña Incorrecta`
    })
   }

   // Generamos token
   const token = jwt.sign({
    username: username
   }, process.env.SECRET_KEY || '');
   
   res.json(token);
}