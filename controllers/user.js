const root = require("app-root-path");
const userModel = require(`${root}/models/user`);
const isError = require(`${root}/helpers/isError`);

module.exports.createUserSchema = async function(req, res, next) {
  const orgDB = req.db.Hino;
  const users = await userModel
    .createSchema({
      db: orgDB
    })
    .catch(err => {
      const error = err;
      error.status = 500;
      return error;
    });
  if (isError(users)) {
    return next(users);
  }
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
      error.status = 500;
      return error;
    });
  if (isError(users)) {
    return next(users);
  }
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: "New user is created"
  });
};

module.exports.fetchUsers = async function(req, res, next) {
  const orgDB = req.db.Hino;
  const users = await userModel
    .fetchUsers({
      db: orgDB,
      data: null
    })
    .catch(err => {
      const error = err;
      error.status = 500;
      return error;
    });
  if (isError(users)) {
    return next(users);
  }
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: users
  });
};

module.exports.fetchUser = async function(req, res, next) {
  const orgDB = req.db.Hino;
  const users = await userModel
    .fetchUsers({
      db: orgDB,
      data: req.params.name
    })
    .catch(err => {
      const error = err;
      error.status = 500;
      return error;
    });
  if (isError(users)) {
    return next(users);
  }
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: users
  });
};

module.exports.updateUser = async function(req, res, next) {
  const orgDB = req.db.Hino;
  const users = await userModel
    .updateUser({
      db: orgDB,
      criteria: { name: req.params.name },
      data: req.body
    })
    .catch(err => {
      const error = err;
      error.status = 500;
      return error;
    });
  if (isError(users)) {
    return next(users);
  }
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: users
  });
};

module.exports.deleteUser = async function(req, res, next) {
  const orgDB = req.db.Hino;
  const users = await userModel
    .deleteUser({
      db: orgDB,
      criteria: { name: req.params.name }
    })
    .catch(err => {
      const error = err;
      error.status = 500;
      return error;
    });
  if (isError(users)) {
    return next(users);
  }
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: users
  });
};
