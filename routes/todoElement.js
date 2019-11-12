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
    .then((result) => { res.status(200).json({message:"succes : " + result}) })
    .catch((err) => { res.status(500).json({message: "error : " + err})})
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

routeur.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    todoElement.deleteOne({element: req.params.id}, (err, result) => {
        if (err) {
            res.status(400).json({message: "there is a probleme when deleting the element !"})
        } else {
            console.log(result)
            res.render(200,'/')
        }
    })
})

module.exports = routeur