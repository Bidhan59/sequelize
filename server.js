const express = require("express");
const root = require("app-root-path");
const { Sequelize } = require("sequelize");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./logger").logger("mssql-node");
const router = require(`./routes.js`);
const connection = require(`${root}/utils/dbConnection.js`);
const port = 8080;
(async function() {
  // const sequelize = new Sequelize("Hino", "SA", "Basanti59@", {
  //   host: "localhost",
  //   dialect: "mssql",
  //   dialectOptions: {
  //     options: {
  //       useUTC: false,
  //       dateFirst: 1
  //     }
  //   },
  //   pool: {
  //     max: 5,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000
  //   }
  // });
  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(
    morgan(logger.morganLogger.format, {
      stream: logger.morganLogger.stream
    })
  );
  logger.appLogger.info("Booting Sample Application");
  try {
    // await sequelize.sync({
    //   logging: console.log,
    //   force: true
    // });
    const db = await connection.getDB();
    if (db == null) {
      logger.appLogger.info(`DB cannot be connected Stopping the APP`);
      process.exit(1);
    }

    console.log("came here>>>>>>>>>>>>>>>");
    app.use((req, res, next) => {
      req.db = {
        Hino: db
      };
      next();
    });
    logger.appLogger.info("Attaching the routes");
    app.use("/", router);
    app.use((req, res, next) => {
      // catch 404 and forward to error handler
      const err = new Error("Resource Not Found");
      err.status = 404;
      next(err);
    });
    app.use((err, req, res, next) => {
      logger.httpLogger.error(req, {
        message: err.message,
        error: err
      });
      const statusCode = err.status || 500;
      let message = err.message || "Internal Server Error";

      // if status code is 500 by defaul't then replace the message
      // that is coming from the stack error message, for it's
      // internal message an developer has handled it properly
      // and should not to be displayed.
      if (statusCode === 500) {
        message = "Internal Server Error";
      }
      res.status(statusCode).json({ message });
    });
  } catch (err) {
    logger.appLogger.info("Some thing went wrong while connecting to database");
  }
  app.listen(4000, function() {
    logger.appLogger.info("Application started at port:4000");
  });
})();
