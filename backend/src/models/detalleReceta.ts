import { DataTypes } from 'sequelize';
import db from '../db/connection';

const DetalleReceta = db.define('detalleReceta', {
    idDetalleReceta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idReceta: {
        type: DataTypes.INTEGER
    },
    idIngrediente: {
        type: DataTypes.INTEGER
    },
    cantidadNecesaria: {
        type: DataTypes.INTEGER
    },
    unidadMedida: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default DetalleReceta;
