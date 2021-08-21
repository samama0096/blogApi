const express = require('express');
const profilerouter = express.Router();
const Profile = require("../models/users.model");
const Blogpost = require("../models/blogpost.model");

//get profile data route:
profilerouter.get("/profile", (req, res) => {

    let { username } = req.body;
    Profile.findOne({ username: username }, (err, doc) => {

        if (err) {
            res.status(500).send({
                msg: "database error",
                data: null
            });
        } else if (doc != null) {
            res.status(200).send({
                msg: "Getting your profile!",
                data: doc
            });
        } else if (doc == null) {
            res.status(404).send({
                msg: "error occured!",
                data: null
            });
        }

    })
})



//delete profile:
profilerouter.delete("/deleteuser", (req, res) => {

    let { username } = req.body;
    Profile.deleteOne({ username: username }, (err, d) => {

        if (err) {
            res.status(500).send({
                msg: "database error",
                data: null
            });
        } else res.status(200).send({
            msg: "Account deleted successfuly!",
            data: null
        });
    })
    Blogpost.deleteMany({ username: username }, (error, doc) => {

        if (error) {
            res.status(500).send({
                msg: "database error",
                data: null
            });
        } else res.status(200).send({
            msg: "Account deleted successfuly!",
            data: null
        });
    })


})



module.exports = profilerouter;