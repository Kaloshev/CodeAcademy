var express = require("express");
require('dotenv/config');
var bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');
const users = require("./users/routes")

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", users);

var port = process.env.PORT || 8080;

app.listen(port, () => {
        console.log(`API is listenig on port ${port}!`);
});