var express = require("express");
require("dotenv/config");
var bodyParser = require('body-parser');
const fs = require("fs")

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// app.get("/users/:number", (req, res) => {
//     /*da pristapam do http parametri koristime .params !!! : (so dve tocki definirame http parametar) */
//     // var id = req.params.number
//     // console.log(id)
//     // res.send("HEllo From Gjorgji(from api!)")
//     /*da pristapam do query strings  koristime .name na primer!!! ? (definirame query string) */
//     // res.send(req.query.name)
//     // res.send(id)
// })


app.get("/users/read/all", (req, res) => {
    let rawdata = fs.readFileSync("users.json");
    let student = JSON.parse(rawdata);
    res.status(200).send(student)
    // console.log(student);

})
app.get("/users/read/all/:number", (req, res) => {
    let rawdata = fs.readFileSync("users.json");
    let student = JSON.parse(rawdata);
    var id = req.params.number
    res.status(200).send(student[id])
    // console.log(student[id])
})

app.post("/users/read/all", (req, res) => {
    let rawdata = fs.readFileSync("users.json");
    let student = JSON.parse(rawdata);
    student.push(req.body)
    fs.writeFileSync("users.json", JSON.stringify(student, null, 2))
    res.send(student)
})

app.delete("/users/read/all/delete/:number", (req, res) => {
    let rawdata = fs.readFileSync("users.json");
    let student = JSON.parse(rawdata);
    var id = req.params.number
    student.splice(id, 1)
    fs.writeFileSync("users.json", JSON.stringify(student, null, 2))
    res.send(student)
})

app.put("/users/read/all/:number", (req, res) => {
    let rawdata = fs.readFileSync("users.json");
    let student = JSON.parse(rawdata);
    var id = req.params.number
    var update = req.body;

    student[id] = update;
    fs.writeFileSync("users.json", JSON.stringify(student, null, 2))
    res.send(student)

})

/****************************************************** 
 * Ne mi e jasno patch !!
 * Istoto go pravam i so PUT zasto go koristam patch i sto mozam partialno da menjam sto ne mozam so PUT???
***************************************************** */
// app.patch("/users/:number", (req, res) => {
//       let rawdata = fs.readFileSync("users.json");
// let student = JSON.parse(rawdata);
// var id = req.params.number
// var update = req.body;

// student[id]= update;
// fs.writeFileSync("users.json", JSON.stringify(student, null , 2))
// res.send(student)
// })

var port = process.env.PORT || 8000;

app.listen(3000, () => {
    console.log(`App serverrr is listening on port ${port}!`);
});