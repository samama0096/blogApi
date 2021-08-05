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
            res.status(500).send("database error!");
        } else
        if (reslt == null) {
            User.insertMany({ username: username, email: email, password: password }, (error, result) => {
                if (error) {
                    console.log(error);
                }
                console.log(`Username: ${result.username} is registered successfully!`);
                res.status(200).send(reslt);
            });
        } else
        if (reslt.email == email) {
            console.log(reslt);
            res.status(400).send("Email already registered");
        }

    })


})

//registration route ended!!






//login route:

userroutes.post("/login", (req, res) => {
    let { username, email, password } = req.body;

    User.findOne({ username: username }, (err, doc) => {
        if (err) {
            res.status(500).send({ error: err })
        } else if (doc == null) {
            res.status(404).send({ err: "Please Register yourself first!" });
        } else if (doc != null) {
            if (doc.username == username && doc.password == password) {
                var token = jwt.sign({ username }, s_key, { expiresIn: '1d' });
                res.status(200).send({ status: "Logged In!", token: token });
            } else if (doc.username == username && doc.password != password) {
                res.status(201).send("Invalid Password!")
            }
        }




    })




})





module.exports = userroutes;