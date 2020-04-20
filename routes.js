const routes = require("express").Router();
const root = require("app-root-path");
const user = require(`${root}/controllers/user.js`);
routes.get("/createUserSchema", user.createUserSchema);
routes.post("/insertUser", user.insertUser);
routes.get("/fetchUsers", user.fetchUsers);
routes.put("/updateUser", user.updateUser);
routes.get("/serviceTest", function(req, res) {
  res.send("Services are working in docker");
});
module.exports = routes;
