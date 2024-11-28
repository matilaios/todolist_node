const express = require('express');
const router = express.Router();
const todolist = require('../todolist');



//chercher les taches

router.get('/', (req,res)=>{

    const getTask="SELECT*FROM task";

    todolist.query(getTask, (error, result)=>{
        if (error) throw error
        res.json(result);


    });


});


//CHERCHER LES TACHES PAR ID

router.get('/getTaskById/:id_task', (req, res)=>{
    const {id_task}=req.params;
    const getTaskById = 'select*from task WHERE id_task=?;';

    todolist.query(getTaskById,[id_task], (error, result)=>{
        if(error) throw error;
        res.json(result);
    })
})


//AJOUTER UNE TACHE

router.post('/addTask', (req,res)=>{
const {libelle_task, description_task, date_creation_task, id_state}=req.body;

const addTask="INSERT INTO task (libelle_task, description_task, date_creation_task, id_state) VALUES (?,?,?,?);";

todolist.query(addTask,[libelle_task, description_task, date_creation_task, id_state],(error,result)=>{
    if(error) throw error;
    res.send('tâche ajoutée');

});


});

//DELETE UNE TACHE

router.delete('/deletetask/:id_task', (req, res)=>{
    const {id_task}=req.params;

    const deleteTask="DELETE FROM task WHERE id_task=?;";
    todolist.query(deleteTask,[id_task], (error, result)=>{
        if(error) throw error;
        res.send('Tâche supprimée');
    });



});


//MODIFIER TACHE

router.patch('/modifyTask/:id_task', (req,res)=>{

    const {id_task}= req.params;

    const {libelle_task, description_task, date_creation_task,id_state}=req.body;
    console.log(req.body);

    const modifyTask="UPDATE task SET libelle_task=?, description_task=?, date_creation_task=?, id_state=? WHERE id_task=?;";
    todolist.query(modifyTask,[libelle_task, description_task,date_creation_task,id_state, id_task], (error,result)=>{
        if(error) throw error;
        res.send('méfait accompli');

    })

})

module.exports = router;