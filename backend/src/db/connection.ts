import { Sequelize } from "sequelize";

const sequelize = new Sequelize('logistica', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;