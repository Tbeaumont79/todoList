const express = require('express')
const routeur = express.Router()

routeur.get('/about', (req, res) => {
    res.render("about");    
})

module.exports = routeur