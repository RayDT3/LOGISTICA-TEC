import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Ingrediente = db.define('ingredientes', {
    idIngrediente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    cantidadDisponible: {
        type: DataTypes.INTEGER
    },
    unidadMedida: {
        type: DataTypes.STRING
    },
    fecha_de_vencimiento: {
        type: DataTypes.DATE
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default Ingrediente;
