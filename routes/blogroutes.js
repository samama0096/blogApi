const express = require('express');
const blogrouter = express.Router();
const blogpost = require('../models/blogpost.model');



//upload blog route:

blogrouter.post("/upload", (req, res) => {

    let { username, title, body } = req.body;


    blogpost.insertMany({ username: username, title: title, body: body }, (err, result) => {
        if (err) {

            res.status(500).send("database error!")
        } else console.log(result);
        res.status(200).send("Published!");

    })

})




//get news feed!

blogrouter.get("/getfeed", (req, res) => {

    blogpost.find({}, (err, doc) => {

        if (err) {
            res.status(500).send("database error!")
        } else if (doc != null) {
            res.status(200).send({ feed: doc });
        } else res.status(400).send("Nothing to show here!");

    })

})




//get feed by title!

blogrouter.get("/search", (req, res) => {
    let { title } = req.body;
    blogpost.find({ title: title }, (err, docm) => {

        if (err) {
            res.status(500).send("Database Error!");

        } else if (docm != null) {

            res.status(200).send(docm);
        } else if (docm == null) {
            res.status(400).send("No matches!");
        }

    })


})




module.exports = blogrouter;