const express = require('express');
const router = express.Router();
const todolist = require('../todolist');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')


router.get('/user', (req, res) => {
    const getUser = "SELECT * FROM user";
    todolist.query(getUser, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

router.get('/getUserById/:id_user', (req, res) => {
    const { id_user } = req.params;
    const getUserById = 'SELECT * FROM user WHERE id_user = ?';
    todolist.query(getUserById, [id_user], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

router.post('/addUser', async (req, res) => {
    const { nom_user, prenom_user, mail_user, password_user } = req.body;
    //const hashedPassword = await bcrypt.hash(password_user, 10);
    const addUser = "INSERT INTO user (nom_user, prenom_user, mail_user, password_user) VALUES (?, ?, ?, ?);";
    todolist.query(addUser, [nom_user, prenom_user, mail_user, password_user], (error, result) => {
        if (error) throw error;
        res.status(201).send('User inscrit');
    });
});

router.put('/modifyUser/:id_user', (req, res) => {
    const { id_user } = req.params;
    const { nom_user, prenom_user, mail_user, password_user } = req.body;
    console.log(req.body);
    const modifyUser = "UPDATE user SET nom_user = ?, prenom_user = ?, mail_user = ?, password_user = ? WHERE id_user = ?;";
    todolist.query(modifyUser, [nom_user, prenom_user, mail_user, password_user, id_user], (error, result) => {
        if (error) throw error;
        res.send('User modifié');
    });
});

router.delete('/deleteUser/:id_user',auth.authentification, (req, res) => {
    if (req.role != "admin") {
        return res.status(401).send('Vous n\'avez le droit de supprimer un user')
    }
    const { id_user } = req.params;
    const deleteUser = "DELETE FROM user WHERE id_user = ?;";
    todolist.query(deleteUser, [id_user], (error, result) => {
        if (error) throw error;
        res.send('User supprimé');
    });
});


// LOGIN
router.post('/login', (req, res) => {
    const { mail_user, password_user } = req.body;
    const sql = 'SELECT * FROM user WHERE mail_user = ?;';
    todolist.query(sql, [mail_user], (erro, results) => {
        if (erro) throw erro;
        // res.send("ok");
        if (results.length > 0) {
            const user = results[0];
            console.log(user.password_user);
            const token = jwt.sign({ id: user.id_user, role:user.role }, 'secretkey', { expiresIn: '1h' });
            res.json({ token });
            
            // console.log(bcrypt.compareSync(password_user, user.password_user))
            
            // bcrypt.compare(password_user, user.password_user, (erro, result) => {
            //     if (erro) throw erro;
            //     if (result) {
            //         const token = jwt.sign({ id: user.id_user }, 'secretkey', { expiresIn: '1h' });
            //         res.json({ token });
            //     } else {
            //         res.status(401).send('Password incorrect');
            //     }
            // });
        } else {
            res.status(404).send('User not found');
        }
    });
});

module.exports = router;
