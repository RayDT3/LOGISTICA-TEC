import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Pedido = db.define('pedidos', {
    id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_receta: {
        type: DataTypes.INTEGER
    },
    descripcion: {
        type: DataTypes.STRING(250),
    },
    fecha_pedido: {
        type: DataTypes.DATE
    },
    estado: {
        type: DataTypes.STRING(10),
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default Pedido;
