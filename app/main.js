const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const userroutes = require('../routes/userroutes');
const blogroutes = require('../routes/blogroutes');
const profileroutes = require('../routes/profileroutes')
const port = process.env.PORT || 2000;
dotenv.config();
const app = express();
app.use(express.json());




//connection to mongo database :
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
    console.log("connected to mongo");

});




//setting routes for server's api
app.use("/user", userroutes)
app.use("/blog", blogroutes)
app.use("/profile", profileroutes)

app.get('/', (req, res) => {

        res.send('hello from simple server :)')

    })
    //sample route to check server status:


app.listen(process.env.PORT || 2000, () => {

    console.log('Hi!')

})