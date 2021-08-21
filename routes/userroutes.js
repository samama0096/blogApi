const express = require('express');
const userroutes = express.Router();
const User = require("../models/users.model")
const jwt = require('jsonwebtoken')
const s_key = "nothingmeansnothing";

//registeration route:
userroutes.post("/register", (req, res) => {
    let { username, email, password } = req.body;

    User.findOne({ email: email }, (err, reslt) => {

        if (err) {
            console.log(err);
            res.status(500).send({
                msg: "database error occured",
                data: null
            });
        } else
        if (reslt == null) {
            User.insertMany({ username: username, email: email, password: password }, (error, result) => {
                if (error) {
                    res.send({
                        msg: " error occured!",
                        data: error
                    })
                }
                console.log(`Username: ${username} is registered successfully!`);
                res.status(200).send({
                    msg: "success!",
                    data: result
                });
            });
        } else
        if (reslt.email == email) {
            console.log(reslt);
            res.status(400).send({
                msg: "email already present!",
                data: null
            });
        }

    })


})

//registration route ended!!






//login route:

userroutes.post("/login", (req, res) => {
    let { username, password } = req.body;

    User.findOne({ username: username }, (err, doc) => {
        if (err) {
            res.status(500).send({
                msg: "database error",
                data: null
            })
        } else if (doc == null) {
            res.status(404).send({
                msg: "please register yourself first!",
                data: null
            });
        } else if (doc != null) {
            if (doc.username == username && doc.password == password) {
                var token = jwt.sign({ username }, s_key, { expiresIn: '1d' });
                res.status(200).send({
                    msg: "logged in!",
                    data: token
                });
            } else if (doc.username == username && doc.password != password) {
                res.status(201).send({
                    msg: "invalid password",
                    data: null
                })
            }
        }




    })




})





module.exports = userroutes;