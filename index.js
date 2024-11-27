const express = require('express');
const app = express();
require('dotenv').config();
const userRoute = require('./routes/user');
const todolist = require('./todolist');
const bodyParser = require('body-parser');
const taskRoute = require('./routes/task');

const cors = require ('cors')


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/todolist', userRoute);
app.use('/todolist/task', taskRoute);




// app.get("/", (req,res)=>{
// res.send("taches à faire");

// });

app.listen(process.env.PORT || 3000,()=>{
    console.log("je suis sur le port 3000");
})