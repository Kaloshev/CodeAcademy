const fs = require('fs');
const path = require('path');
const conn = require("../database")

getAllPostsQuery = (post) => {
    const query = "SELECT * FROM user join posts ON user.id = posts.userId WHERE userId = ?"
    return new Promise((resolve, reject) => {
        conn.query(query,[post.id] ,function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
}

getAllPosts = async (req, res) => {
    try {
        const post = req.params
        const posts = await getAllPostsQuery(post);
        console.log(req.params)
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};

getSpecificPostQuery = (id) => {
    const query = "SELECT * FROM posts WHERE id = ?"
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


getSpecificPost = async (req, res, next) => {
    if (req.params.id <= 0) {
        var error = new Error("Id can not be 0 or less then 0!");
        error.status = 401;
        next(error);
    }
    try {
        const specificPost = await getSpecificPostQuery(req.params.id)
        res.status(200).send(specificPost);
    } catch (error) {
        res.status(500).send(error);
    }

};

createPostQuery = (post) => {
    const query = "INSERT INTO posts(text,likes,createdOn, userId) VALUES (?,?,now(), ?)"
    return new Promise((resolve, reject) => {
        conn.query(query, [post.text, post.likes, post.userId], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
}

cratePost = async (req, res, ) => {
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
        const post = req.body
        const createdPost = await createPostQuery(post)
        res.status(200).send(createdPost);
    } catch (error) {
        res.status(500).send(error);
        console.log("error")
    }

};

updatePost = (req, res) => {
    res.status(200).send("Proba za updatePost");

};

updateSpecificPost = (req, res) => {
    res.status(200).send("Proba za updateSpecificPost");
};

deletePost = (req, res) => {
    res.status(200).send(`Post has been deleted!`)
};

module.exports = {
    getAllPosts,
    getSpecificPost,
    cratePost,
    updatePost,
    updateSpecificPost,
    deletePost
};