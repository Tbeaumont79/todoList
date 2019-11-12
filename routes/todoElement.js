const todoElement = require('../modele/todoElement')
const bodyParser = require('body-parser')
const express = require('express')
const routeur = express.Router()
const date = require("../date.js");

routeur.use(bodyParser.urlencoded({extended: true}));

routeur.post('/', (req, res) => {
    const elements = req.body.newItem
    const todoelement = new todoElement({
        element: elements
    })
    todoelement.save()
    .then((result) => { res.redirect('http://localhost:3000') })
    .catch((err) => { res.redirect('http://localhost:3000')})
})

routeur.get('/', (req, res) => {
    const getTodoElement = todoElement.find({}, (err, result) => {
        if (err) {
            res.status(400).json({message:"cannot get element ! "})
        } else {
            const day = date.getDate();
            res.render("list", {listTitle: day, newListItems: result});
        }
    })
})

routeur.get('/delete/:idTodo', (req, res) => {
    todoElement.remove({ _id: req.params.idTodo })
        .exec()
        .then(result => { res.redirect("http://localhost:3000");})
        .catch(err => { res.redirect("http://localhost:3000");})
})

module.exports = routeur