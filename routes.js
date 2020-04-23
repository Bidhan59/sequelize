const routes = require("express").Router();
const root = require("app-root-path");
const user = require(`${root}/controllers/user.js`);
routes.get("/createUserSchema", user.createUserSchema);
routes.post("/users", user.insertUser);
routes.get("/users", user.fetchUsers);
routes.get("/user/:name", user.fetchUser);
routes.put("/user/:name", user.updateUser);
routes.delete("/user/:name", user.deleteUser);
routes.get("/serviceTest", function(req, res) {
  res.send("Services are working in docker");
});
module.exports = routes;
