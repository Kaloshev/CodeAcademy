const fs = require('fs');
const path = require('path');
const conn = require("../database")

getAllPostsQuery = () => {
    const query = "SELECT * FROM posts"
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

getAllPosts = async (req, res) => {
    try {
        const posts = await getAllPostsQuery();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};

getAlluserPostsQuery = (id) => {
    const query = "SELECT * FROM user JOIN posts ON user.id = posts.userId WHERE user.id = 1;"
    return new Promise((resolve, reject) => {
        conn.query(query,[id], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
}

getAllUserPosts = async (req, res) => {
    try {
        const posts = await getAlluserPostsQuery(req.params.id);
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
    getAllUserPosts,
    getAllPosts,
    getSpecificPost,
    cratePost,
    updatePost,
    updateSpecificPost,
    deletePost
};