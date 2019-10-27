const fs = require('fs');
const path = require('path');
const validator = require("../helper")
const conn = require("../database")

getAllUsersQuery = () => {
    const query = "SELECT * FROM user"
    return new Promise((resolve, reject) => {
        conn.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
}

getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

getSpecificUserQuery = (id) => {
    const query = "SELECT * FROM user WHERE id = ?"
    return new Promise((resolve, reject) => {
        conn.query(query, [id], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
}


getSpecificUser = async (req, res, next) => {
    if (req.params.id <= 0) {
        var error = new Error("Id can not be 0 or less then 0!");
        error.status = 401;
        next(error);
    }
    try {
        const specificUser = await getSpecificUserQuery(req.params.id)
        res.status(200).send(specificUser);
    } catch (error) {
        res.status(500).send(error);
    }

};

createUserQuery = (name) => {
    const query = "INSERT INTO user(name) VALUES (?)"
    return new Promise((resolve, reject) => {
        conn.query(query, [name], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
}

crateUser = async (req, res,) => {
    // var isValidEmail = validator.emailValidator(req.body.email);
    // var isValidAge = validator.ageValidator(req.body.age);
    // if (!isValidEmail && !isValidAge) {
    //     var error = new Error("E-mail is too short or you are underage!");
    //     error.status = 401;
    //     next(error)
    // } else if (!isValidEmail) {
    //     var error = new Error("E-mail is too short!");
    //     error.status = 401;
    //     next(error)
    // } else if (!isValidAge) {
    //     var error = new Error("You are under age, you must be 18 or more to create user!");
    //     error.status = 401;
    //     next(error)
    // }
    try {
        const createdUser = await createUserQuery(req.body)
        console.log(req.body)
        res.status(200).send(createdUser);
    } catch (error) {
        res.status(500).send(error);
        console.log("error")
    }

};

updateUser = (req, res) => {
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
};

updateSpecificUser = (req, res) => {
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
};

deleteUser = (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    users = users.filter((user) => {
        return user.id != req.params.id
    })

    let data = JSON.stringify(users, null, 4);
    fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    res.status(200).send(`User has been deleted!`)
};

module.exports = {
    getAllUsers,
    getSpecificUser,
    crateUser,
    updateUser,
    updateSpecificUser,
    deleteUser
};