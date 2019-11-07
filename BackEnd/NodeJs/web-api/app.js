var express = require('express');
var bodyParser = require('body-parser');
// const users = require('./users/routes');
// const posts = require("./posts/routes");
const appRouter = require("./router")
const middleware = require("./middleware/common")
var unless = require('express-unless');
var jwt = require('express-jwt');
require('dotenv/config');

const app = express();

app.use(middleware.logger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const poublicRoutePaths = ["/login", "/users/create"]
app.use(jwt({ secret: "aaaa" }).unless({ path: poublicRoutePaths }))

// app.use('/users', users);
// app.use('/posts', posts);

app.use(appRouter);

app.use(middleware.errorRoute);
app.use(middleware.errHandler);

var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});