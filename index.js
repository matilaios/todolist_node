const express = require('express');
const app = express();
require('dotenv').config();
const userRoute = require('./routes/user');
const todolist = require('./todolist')

app.use(express.json());

app.use('/todolist/', userRoute);

app.get("/", (req,res)=>{
res.send("taches à faire");


});

app.listen(process.env.PORT || 3001,()=>{
    console.log("je suis sur le port 3000");
})