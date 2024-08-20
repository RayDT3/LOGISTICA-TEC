import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Categoria = db.define('categorias', {
    categoria: {
        type: DataTypes.STRING
    },
}, {
    createdAt: false,
    updatedAt: false
});

export default Categoria;