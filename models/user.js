const root = require("app-root-path");
const sequelize = require(`${root}/server.js`);
const logger = require(`${root}/logger`).logger("mssql-node");
const { Sequelize } = require("sequelize");

function userSchema(db) {
  const user = db.define("Users", {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV6,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your ID"
        }
      }
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name"
        }
      }
    },
    bio: Sequelize.TEXT
  });
  return user;
}
module.exports.createSchema = async function({ db }) {
  var User = userSchema(db);
  try {
    const result = await User.sync({
      logging: console.log,
      force: true
    });
    return result;
  } catch (err) {
    logger.appLogger.info(
      `Some thing went wrong while defining the schema ${err}`
    );
    return err;
  }
};

module.exports.insertUser = async function({ db, data }) {
  var User = userSchema(db);
  try {
    const result = await User.sync({
      logging: console.log
    });
  } catch (err) {
    logger.appLogger.info(
      `Some thing went wrong while defining the schema ${err}`
    );
    return err;
  }
  try {
    const user = await User.create({
      uuid: data.uuid,
      name: data.name,
      bio: data.bio
    });
    return user;
  } catch (err) {
    logger.appLogger.info(`Error in inserting the user data ${err}`);
    return err;
  }
};

module.exports.fetchUsers = async function({ db, data }) {
  var User = userSchema(db);
  try {
    const result = await User.sync({
      logging: console.log
    });
  } catch (err) {
    logger.appLogger.info(
      `Some thing went wrong while defining the schema ${err}`
    );
    return err;
  }
  try {
    const user = await User.findAll({ where: { name: data } });
    return user;
  } catch (err) {
    logger.appLogger.info(`Error in fetching the user data ${err}`);
    return err;
  }
};

module.exports.updateUser = async function({ db, criteria, data }) {
  var User = userSchema(db);
  try {
    const result = await User.sync({
      logging: console.log
    });
  } catch (err) {
    logger.appLogger.info(
      `Some thing went wrong while defining the schema ${err}`
    );
    return err;
  }

  try {
    const user = await User.update(
      { bio: criteria, updatedAt: new Date() },
      { where: { name: data.bio } }
    );
    return user;
  } catch (err) {
    logger.appLogger.info(`Error in updating the user data ${err}`);
    return err;
  }
};
