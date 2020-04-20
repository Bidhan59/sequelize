const root = require("app-root-path");
const sequelize = require(`${root}/server.js`);
const logger = require(`${root}/logger`).logger("mssql-node");
const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;

function userSchema() {
  class User extends Model {}
  User.init(
    {
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
    },
    { sequelize: db, modelName: "User" }
  );
  return User;
}
module.exports = {
  User: userSchema
};
