const mongoose = require('mongoose')
const todoElement = require('../modele/todoElement')
const bodyParser = require('body-parser')
const express = require('express')
const routeur = express.Router()

routeur.use(bodyParser.urlencoded({extended: true}));

routeur.post('/', (req, res) => {
    const element = req.body.newItem
    const todoelement = new todoElement({
        element: element
    })
    todoelement.save()
    .then((result) => { res.status(200).json({message:"succes : " + result}) })
    .catch((err) => { res.status(500).json({message: "error : " + err})})
})

module.exports = routeur