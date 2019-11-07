const fs = require('fs');
const path = require('path');
const validator = require("../helper")
const conn = require("../database")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

getAllUsersQuery = () => {
    const query = "SELECT * FROM user "
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
    const query = "SELECT * FROM user JOIN posts ON user.id = posts.userId WHERE user.id = ?";
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

createUserQuery = (name, surname, email, age, isActive, pass) => {
    const query = "INSERT INTO user(name, surname, email, age, isActive, password) VALUES (?, ?, ?, ?, ?, ?)"
    return new Promise((resolve, reject) => {
        conn.query(query, [name, surname, email, age, isActive, pass], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
}

crateUser = async (req, res) => {
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
        const userRequest = req.body;
        const passHash = bcrypt.hashSync(userRequest.password, 10);
        const createdUser = await createUserQuery(req.body.name, req.body.surname, req.body.email, req.body.age, req.body.isActive, passHash)
        // const createdUser = await createUserQuery(userRequest, passHash)
        console.log(req.body)
        res.status(200).send(createdUser);
    } catch (error) {
        res.status(500).send(error);
        console.log("error")
    }

};

updateUserQuery = (name, surname, email, age, isActive, id) => {
    const query = `UPDATE user SET name = ?,surname = ?, email = ?, age= ?, isActive = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        conn.query(query, [name, surname, email, age, isActive, id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                // console.log(results)
                if (results.affectedRows == 0) {
                    reject("Nema user so takvo ID")
                } else {
                    resolve(results)
                }
            }
        });
    });
}

updateUser = async (req, res) => {
    try {
        const update = req.body;
        const updatedUser = await updateUserQuery(update.name, update.surname, update.email, update.age, update.isActive, req.params.id)
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
updateSpecificUserQuery = (name, surname, id) => {
    const query = `UPDATE user SET name = ?,surname = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        conn.query(query, [name, surname, id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        });
    });
}

updateSpecificUser = async (req, res) => {
    try {
        var reqBody = req.body;
        const updateSpecificUser = await updateSpecificUserQuery(reqBody.name, reqBody.surname, req.params.id);
        res.status(200).send(updateSpecificUser);
    } catch (error) {
        res.status(500).send(error)

    }
    // console.log(req.params.id)
    // const updatedUser = req.body
    // users.forEach(user => {
    //     if (user.id == req.params.id) {
    //         user.id = updatedUser.id ? updatedUser.id : user.id;
    //         user.name = updatedUser.name ? updatedUser.name : user.name;
    //         user.surname = updatedUser.surname ? updatedUser.surname : user.surname;

    //         res.status(400).send(`User with id: ${req.params.id} has been updated, with user id: ${user.id}`)
    //         let data = JSON.stringify(users, null, 4);
    //         fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    //     }
    // })
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

getUserByEmailQuery = (email) => {
    const query = "SELECT * FROM user  WHERE email = ?"
    return new Promise((resolve, reject) => {
        conn.query(query, [email], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                resolve(results);
            };
        });
    });

}

logInUser = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    try {
        const user = await getUserByEmailQuery(email)
        var newUser = user[0];
        const matchPass = bcrypt.compareSync(pass, newUser.password)
        if (matchPass) {
            var token = jwt.sign({ newUser }, 'aaaa',{ expiresIn: "1h" });
            // res.status(200).send("Password match");
            res.status(200).send(token);
            console.log(matchPass);

        } else {
            res.status(401).send("WRONG PASSWORD");
            console.log(matchPass);

        }
    } catch (error) {
        res.status(500).send(error);
    }

}

module.exports = {
    logInUser,
    getAllUsers,
    getSpecificUser,
    getSpecificUserPosts,
    crateUser,
    updateUser,
    updateSpecificUser,
    deleteUser
};