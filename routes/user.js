const express = require('express');
const router = express.Router();
const todolist = require('../todolist');


router.get('/user', (req,res)=> {

    const getUser = "SELECT*FROM user";

    todolist.query(getUser, (error, result) => {
        if (error) throw error
        res.json(result);

    })

});

//ajouter un utilisateur

router.post('/addUser',(req,res)=>{
    const {nom_user, prenom_user, mail_user, password_user}=req.body;
})

module.exports = router;
