const express = require('express');
const blogrouter = express.Router();
const blogpost = require('../models/blogpost.model');



//upload blog route:

blogrouter.post("/upload", (req, res) => {

    let { username, title, body } = req.body;


    blogpost.insertMany({ username: username, title: title, body: body }, (err, result) => {
        if (err) {

            res.status(500).send({
                msg: "Database error!",
                data: null
            })
        } else console.log(result);
        res.status(200).send({
            msg: "Published!",
            data: null
        });

    })

})




//get news feed!

blogrouter.get("/getfeed", (req, res) => {

    blogpost.find({}, (err, doc) => {

        if (err) {
            res.status(500).send({
                msg: "Databse error!",
                data: null
            })
        } else if (doc != null) {
            res.status(200).send({
                msg: "Account deleted successfuly!",
                data: doc
            });
        } else res.status(404).send({
            msg: "Unable to fetch data!",
            data: null
        });

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