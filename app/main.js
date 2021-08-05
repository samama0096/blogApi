const express = require('express');
const mongoose = require('mongoose');
const userroutes = require('../routes/userroutes');
const blogroutes = require('../routes/blogroutes');
const profileroutes = require('../routes/profileroutes')
const port = process.env.port || 2000;
const app = express();
app.use(express.json());



//connection to mongo database :
mongoose.connect("mongodb+srv://samo:msaleh0096@bloguser.uhgmq.mongodb.net/bloguser?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
    console.log("connected to mongo");
});




//setting routes for server's api
app.use("/user", userroutes)
app.use("/blog", blogroutes)
app.use("/profile", profileroutes)


//sample route to check server status:
app.get('/', (req, res) => {

    res.send('hello from simple server :)')

})




app.listen(port, () => {

    console.log(`Listening at ${port}`);

})