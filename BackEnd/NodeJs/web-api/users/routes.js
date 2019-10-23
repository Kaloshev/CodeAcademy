var express = require('express');
const actions = require("./actions")

var routes = express.Router();

routes.get('/', actions.getAllUsers);
routes.get('/:id', actions.getSpecificUser);
routes.post('/', actions.crateUser);
routes.put("/:id", actions.updateUser)
routes.patch("/:id", actions.updateSpecificUser)
routes.delete("/:id", actions.deleteUser)

module.exports = routes;