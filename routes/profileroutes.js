const express = require('express');
const profilerouter = express.Router();
const Profile = require("../models/users.model");
const Blogpost = require("../models/blogpost.model");

//get profile data route:
profilerouter.get("/profile", (req, res) => {

    let { username } = req.body;
    Profile.findOne({ username: username }, (err, doc) => {

        if (err) {
            res.status(500).send("Database error!");
        } else if (doc != null) {
            res.status(200).send({ profiledata: doc });
        } else if (doc == null) {
            res.status(400).send("No data found!");
        }

    })
})



//delete profile:
profilerouter.delete("/deleteuser", (req, res) => {

    let { username } = req.body;
    Profile.deleteOne({ username: username }, (err, d) => {

        if (err) {
            res.status(500).send("could't delete account");
        } else res.status(200).send("account deleted successfuly!");
    })
    Blogpost.deleteMany({ username: username }, (err, d) => {

        if (err) {
            res.status(500).send("could't delete account");
        } else res.status(200).send("account deleted successfuly!");
    })


})



module.exports = profilerouter;