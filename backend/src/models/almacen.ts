import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Almacen = db.define('almacen', {
    producto: {
        type: DataTypes.STRING
    },
    stock_actual: {
        type: DataTypes.STRING
    },
    numero_factura: {
        type: DataTypes.STRING
    },
}, {
    createdAt: false,
    updatedAt: false
});

export default Almacen;