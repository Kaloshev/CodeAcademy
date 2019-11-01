var express = require('express');
const actions = require("./actions")

var routes = express.Router();

routes.get('/users', actions.getAllUsers);
routes.get('/users/:id', actions.getSpecificUser);
routes.post('/users', actions.crateUser);
routes.put("/users/:id", actions.updateUser)
routes.patch("/users/:id", actions.updateSpecificUser)
routes.delete("/users/:id", actions.deleteUser)

module.exports = routes;