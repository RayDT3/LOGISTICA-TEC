import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesChef from '../routes/chef';
import routesCategoria from '../routes/categorias';
import routesDetalleCompra from '../routes/detalleCompras';
import routesAlmacen from '../routes/almacen';
import routesUsers from '../routes/users';
import routesReceta from '../routes/recetas';
import routesDetalleReceta from '../routes/detalleReceta';
import routesIngredientes from '../routes/ingredientes';
import routesPedidos from '../routes/pedidos';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API SE ESTA EJECUTANDO'
            })
        })
        this.app.use('/api/chef', routesChef),
        this.app.use('/api/users', routesUsers),
        this.app.use('/api/categoria', routesCategoria),
        this.app.use('/api/detalleCompras', routesDetalleCompra),
        this.app.use('/api/almacenes', routesAlmacen),
        this.app.use('/api/receta', routesReceta),
        this.app.use('/api/detalleReceta', routesDetalleReceta),
        this.app.use('/api/ingrediente', routesIngredientes)
        this.app.use('/api/pedido', routesPedidos)
    }

    midlewares() {

        // Parseamos el body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {

        try {
            await db.authenticate();
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error);
            console.log('Error al conectarse a la base de datos')
        }

       
    }


}

export default Server;