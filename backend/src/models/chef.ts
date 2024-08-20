import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Chef = db.define('chef', {
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    dni: {
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default Chef;