const root = require("app-root-path");
const userModel = require(`${root}/models/user`);
const logger = require(`${root}/logger`).logger("mssql-node");

module.exports.createUserSchema = async function(req, res, next) {
  const orgDB = req.db.Hino;
  const users = await userModel
    .createSchema({
      db: orgDB
    })
    .catch(err => {
      const error = err;
      res.status(500).json({
        status: "Failure",
        statusCode: 500,
        data: `Some thing went wrong ${err}`
      });
    });
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: "User Schema is created"
  });
};

module.exports.insertUser = async function(req, res, next) {
  const orgDB = req.db.Hino;
  const users = await userModel
    .insertUser({
      db: orgDB,
      data: req.body
    })
    .catch(err => {
      const error = err;
      res.status(500).json({
        status: "Failure",
        statusCode: 500,
        data: `Some thing went wrong ${err}`
      });
    });
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: "User Data is created"
  });
};

module.exports.fetchUsers = async function(req, res, next) {
  const orgDB = req.db.Hino;
  const users = await userModel
    .fetchUsers({
      db: orgDB,
      data: req.query.name
    })
    .catch(err => {
      const error = err;
      res.status(500).json({
        status: "Failure",
        statusCode: 500,
        data: `Some thing went wrong ${error}`
      });
    });
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: users
  });
};

module.exports.updateUser = async function(req, res, next) {
  console.log("name to update user controller");
  const orgDB = req.db.Hino;
  const users = await userModel
    .updateUser({
      db: orgDB,
      criteria: req.query.name,
      data: req.body
    })
    .catch(err => {
      const error = err;
      res.status(500).json({
        status: "Failure",
        statusCode: 500,
        data: `Some thing went wrong ${error}`
      });
    });
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: users
  });
};
