var express = require('express');
const actions = require("./actions")

var routes = express.Router();

routes.get('/', actions.getAllPosts);
routes.get('/:id', actions.getSpecificPost);
routes.post('/', actions.cratePost);
routes.put("/:id", actions.updatePost)
routes.patch("/:id", actions.updateSpecificPost)
routes.delete("/:id", actions.deletePost)

module.exports = routes;