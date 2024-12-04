const express = require("express");
const router = express.Router();
const todolist = require("../todolist");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")


//chercher les taches

router.get("/", auth.authentification, (req, res) => {
  let sql;
  if (req.role == "admin"){
    sql= "SELECT*FROM task"
  }else{
sql="select * from task inner join  user_task ON user_task.id_user = task.id_user "

  }
  todolist.query(sql, [req.userId], (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});


// Chercher tache par id_user
router.get("/getTaskByIdUser", auth.authentification, (req, res) => {
  const getTask =
    "SELECT task.id_task, task.libelle_task, task.description_task, task.id_state, state.libelle_state, user.prenom_user FROM task INNER JOIN user_task ON user_task.id_task = task.id_task INNER JOIN user ON user.id_user = user_task.id_user INNER JOIN state ON task.id_state = state.id_state WHERE user.id_user = ?;";
  todolist.query(getTask, [req.userId], (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

//CHERCHER LES TACHES PAR ID

router.get("/getTaskById/:id_task", (req, res) => {
  const { id_task } = req.params;
  const getTaskById = "select*from task WHERE id_task=?;";

  todolist.query(getTaskById, [id_task], (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

//AJOUTER UNE TACHE

router.post("/addTask", auth.authentification, (req, res) => {
  const { libelle_task, description_task, date_creation_task, id_state } =
    req.body;
  const addTask =
    "INSERT INTO task (libelle_task, description_task, date_creation_task, id_state) VALUES (?,?,?,?);";

  todolist.query(
    addTask,
    [libelle_task, description_task, date_creation_task, id_state],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .send("Problème au niveau de l'ajout de la tâche");
      }
      const taskId = result.insertId;
      console.log(result.insertId);
      const addIdTaskOnUser =
        "INSERT INTO user_task (id_user, id_task) values (?,?);";
      todolist.query(addIdTaskOnUser, [req.userId, taskId], (error, result) => {
        if (error) {
          return res.status(500).send("Erreur");
        }
        res.send("tâche ajoutée");
      });
    }
  );
});

//DELETE UNE TACHE

router.delete("/deletetask/:id_task", (req, res) => {
  const { id_task } = req.params;

  const deleteTask = "DELETE FROM task WHERE id_task=?;";
  todolist.query(deleteTask, [id_task], (error, result) => {
    if (error) throw error;
    res.send("Tâche supprimée");
  });
});

//MODIFIER TACHE

router.patch("/modifyTask/:id_task", (req, res) => {
  const { id_task } = req.params;

  const { libelle_task, description_task, date_creation_task, id_state } =
    req.body;
  console.log(req.body);

  const modifyTask =
    "UPDATE task SET libelle_task=?, description_task=?, date_creation_task=?, id_state=? WHERE id_task=?;";
  todolist.query(
    modifyTask,
    [libelle_task, description_task, date_creation_task, id_state, id_task],
    (error, result) => {
      if (error) throw error;
      res.send("méfait accompli");
    }
  );
});

//assigner une tache à un utilisateur et sécuriser la tâche

module.exports = router;
