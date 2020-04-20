const { Sequelize } = require("sequelize");
const root = require("app-root-path");
const logger = require(`${root}/logger`).logger("mssql-node");
const connectTodb = async function() {
  const sequelize = new Sequelize("Hino", "SA", "Basanti59@", {
    host: "localhost",
    dialect: "mssql",
    dialectOptions: {
      options: {
        useUTC: false,
        dateFirst: 1
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  try {
    await sequelize.authenticate();
    logger.appLogger.info("Connecting to Database");
  } catch (error) {
    logger.appLogger.info("Error while connecting to Database", error);
  }
  try {
    await sequelize.sync({
      logging: console.log,
      force: true
    });
    logger.appLogger.info("Database is connected");
    return sequelize;
  } catch (err) {
    logger.appLogger.info("Some thing went wrong while connecting to database");
  }
};
module.exports = {
  getDB: connectTodb
};
