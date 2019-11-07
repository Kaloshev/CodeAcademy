var express = require('express');
const actions = require("./actions")

var routes = express.Router();

routes.get('/users', actions.getAllUsers);
// routes.get('/users/:id', actions.getSpecificUser);
routes.get('/users/:id', actions.getSpecificUserPosts);
routes.post('/users/create', actions.crateUser);
routes.put("/users/:id", actions.updateUser)
routes.patch("/users/:id", actions.updateSpecificUser)
routes.delete("/users/:id", actions.deleteUser)
routes.post("/login", actions.logInUser);

module.exports = routes;