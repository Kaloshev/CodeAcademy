var express = require('express');
const actions = require("./actions")

var routes = express.Router();

// routes.get('/users/:userId/post', actions.getAllPosts);
routes.get('/users/:userId/posts', actions.getAllUserPosts);
routes.get('/users/:userId/posts/:postId', actions.getSpecificPost);
routes.post('/users/:userId/posts', actions.cratePost);
routes.put("/users/:userId/posts/:postId", actions.updatePost)
routes.patch("/users/:userId/posts/:postId", actions.updateSpecificPost)
routes.delete("/users/:userId/posts/:id", actions.deletePost)

module.exports = routes;