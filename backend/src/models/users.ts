import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Users = db.define('users', {
    username: {
        type: DataTypes.STRING,
        
    },
    password: {
        type: DataTypes.STRING,
        
    },

}, {
    createdAt: false,
    updatedAt: false
});

export default Users;