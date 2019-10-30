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

getSpecificUserPostsQuery = (id) => {
    const query = "SELECT * FROM user join posts ON user.id = posts.userId WHERE userId = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        });
    });
}

getSpecificUserPosts = async (req, res) => {
    try {
        const specificUserPosts = await getSpecificUserPostsQuery(req.params.id)
        res.status(200).send(specificUserPosts)
    } catch (error) {
        res.status(500).send(error)
    }
}

createUserQuery = (name, surname, email, age, isActive) => {
    const query = "INSERT INTO user(name, surname, email, age, isActive) VALUES (?, ?, ?, ?, ?)"
    return new Promise((resolve, reject) => {
        conn.query(query, [name, surname, email, age, isActive], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
}

crateUser = async (req, res, ) => {
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

        const createdUser = await createUserQuery(req.body.name, req.body.surname, req.body.email, req.body.age, req.body.isActive)
        console.log(req.body)
        res.status(200).send(createdUser);
    } catch (error) {
        res.status(500).send(error);
        console.log("error")
    }

};

updateUserQuery = (name, email, age, id) => {
    const query = `UPDATE user SET name = ?, email = ?, age= ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        conn.query(query, [name, email, age, id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        });
    });
}

updateUser = async (req, res) => {
    try {
        const update = req.body;
        const updatedUser = await updateUserQuery(update.name, update.email, update.age, req.params.id)
        console.log(req.body)
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
        console.log("error")
    }

    // const updatedUser = req.body
    // users.forEach(user => {
    //     if (user.id == req.params.id) {
    //         user.id = updatedUser.id ? updatedUser.id : user.id;
    //         user.name = updatedUser.name ? updatedUser.name : user.name;
    //         user.surname = updatedUser.surname ? updatedUser.surname : user.surname;
    //         user.email = updatedUser.email ? updatedUser.email : user.email;
    //         user.age = updatedUser.age ? updatedUser.age : user.age;
    //         user.isActive = updatedUser.isActive ? updatedUser.isActive : user.isActive;

    //         res.status(400).send(`User with id: ${req.params.id} has been updated, with user id: ${user.id}`)
    //         let data = JSON.stringify(users, null, 4);
    //         fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    //     }
    // })
};

updateSpecificUser = (req, res) => {

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
    getSpecificUserPosts,
    crateUser,
    updateUser,
    updateSpecificUser,
    deleteUser
};