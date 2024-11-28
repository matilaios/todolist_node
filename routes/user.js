const express = require('express');
const router = express.Router();
const todolist = require('../todolist');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




router.get('/user', (req,res)=> {

    const getUser = "SELECT*FROM user";

    todolist.query(getUser, (error, result) => {
        if (error) throw error
        res.json(result);


        });
    });



    router.get('/getUserById/:id_user', (req,res)=>{
        const {id_user} =req.params;

        const getUserById = 'select* from user WHERE id_user=?';

        todolist.query(getUserById, [id_user], (error, result)=>{
            if(error) throw error;
            res.json(result);
        });

    });


// ajouter un utilisateur

router.post('/addUser', (req, res)=>{

    
    const {nom_user, prenom_user, mail_user, password_user} =req.body;
     console.log(req.body);


    const addUser = "INSERT INTO user (nom_user,prenom_user,mail_user,password_user) values (?,?,?,?);";
    todolist.query(addUser,[nom_user, prenom_user, mail_user, password_user],(error,result)=>{
        if(error) throw error;
        res.send('user inscrit');

});

});


//MODIFIER UN USER


router.post('/modifyUser/:id_user', (req,res)=>{

    const {id_user} =req.params;

    const{nom_user, prenom_user, mail_user, password_user}=req.body;
     console.log(req.body);

     const modifyUser="UPDATE user SET nom_user = ?, prenom_user = ?, mail_user = ?, password_user = ? WHERE id_user = ?;";
     todolist.query(modifyUser,[nom_user, prenom_user, mail_user, password_user, id_user], (error,result)=>{
        if(error) throw error;
        res.send('user modifié');


     })


})

//POUR SUPPRIMER : METHODE GET
router.get('/deleteUser/:id_user', (req,res)=>{

    const {id_user} = req.params;


     const deleteUser=" DELETE FROM user WHERE id_user=?;";
     todolist.query(deleteUser,[id_user], (error,result)=>{
        if(error) throw error;
        res.send('bye bye');
     });

});



module.exports = router;


