import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const { database, user, password, db_port, dialect, host } = config;

const sequelize = new Sequelize(database, user, password, {
  dialect,
  host,
  db_port,
});

export default sequelize;

//yarn sequelize-auto -h localhost -d app_food -u root -x 1234 -p 3306 --dialect mysql -o ./src/models -l esm
