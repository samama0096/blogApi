const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPost = Schema({
    username: String,
    title: String,
    body: String,

});

module.exports = mongoose.model("BlogPost", BlogPost);