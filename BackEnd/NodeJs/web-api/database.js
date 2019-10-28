var mysql = require('mysql');
require('dotenv/config');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'gjorgji',
    // password: '123qweasdzxc',
    password: process.env.PASSWORD,
    database: 'code_academy_2019',
    multipleStatements: true
});

connection.connect((error) => {
    if (error) {
        console.log("Problem with DB connection" + error.message)
    } else {
        console.log("Database connected succesfully")
    }
})

module.exports = connection;