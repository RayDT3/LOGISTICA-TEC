import { DataTypes } from 'sequelize';
import db from '../db/connection';

const DetalleCompra = db.define('detalleCompra', {
    proveedor: {
        type: DataTypes.STRING
    },
    encargado_compra: {
        type: DataTypes.STRING
    },
    numero_factura: {
        type: DataTypes.STRING
    },
}, {
    createdAt: false,
    updatedAt: false
});

export default DetalleCompra;