var express = require('express');
const fs = require('fs');
const path = require('path');

var routes = express.Router();

routes.use((req, res, next) => {
    console.log(`Logged ${req.url} - ${req.method} --- ${new Date()}`);
    next();
})

routes.get('/', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    res.status(200).send(users);
});

routes.get("/:id", (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    if (req.params.id == 0) {
        var error = new Error("Id can not be 0!");
        error.status = 401;
        next(error);
    }

    let currentUser = users.filter((user) => {
        return user.id == req.params.id;
    })

    res.status(200).send(currentUser[0])
})

routes.post("/", (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    users.push(req.body);

    let data = JSON.stringify(users, null, 4);
    fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    res.status(201).send(`User has been created!`)
});

routes.put("/:id", (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    console.log(req.params.id)
    const updatedUser = req.body
    users.forEach(user => {
        if (user.id == req.params.id) {
            user.id = updatedUser.id ? updatedUser.id : user.id;
            user.name = updatedUser.name ? updatedUser.name : user.name;
            user.surname = updatedUser.surname ? updatedUser.surname : user.surname;
            user.email = updatedUser.email ? updatedUser.email : user.email;
            user.age = updatedUser.age ? updatedUser.age : user.age;
            user.isActive = updatedUser.isActive ? updatedUser.isActive : user.isActive;

            res.status(400).send(`User with id: ${req.params.id} has been updated, with user id: ${user.id}`)
            let data = JSON.stringify(users, null, 4);
            fs.writeFileSync(path.join(__dirname, 'users.json'), data);

        }
    })

})
routes.patch("/:id", (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    // console.log(req.params.id)
    const updatedUser = req.body
    users.forEach(user => {
        if (user.id == req.params.id) {
            user.id = updatedUser.id ? updatedUser.id : user.id;
            user.name = updatedUser.name ? updatedUser.name : user.name;
            user.surname = updatedUser.surname ? updatedUser.surname : user.surname;

            res.status(400).send(`User with id: ${req.params.id} has been updated, with user id: ${user.id}`)
            let data = JSON.stringify(users, null, 4);
            fs.writeFileSync(path.join(__dirname, 'users.json'), data);

        }
    })

})

routes.delete("/:id", (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    users = users.filter((user) =>
        user.id !== req.params.id)

    let data = JSON.stringify(users, null, 4);
    fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    res.status(200).send(`User has been deleted!`)

    // users.splice(currentUser, 1)

})

routes.use((req, res, next) => {
    var error = new Error("Not found. Please try with another route!");
    error.status = 404;
    next(error);
})

routes.use((err, req, res, next) => {
    var errorObj = {
        status: err.status,
        error: {
            message: err.message
        }
    };

    res.status(err.status).json(errorObj)
})

module.exports = routes;