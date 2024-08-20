import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Receta = db.define('recetas', {
    idReceta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idChef: {
        type: DataTypes.INTEGER
    },
    receta: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default Receta;
