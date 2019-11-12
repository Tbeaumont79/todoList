const mongoose = require('mongoose')

const todoElement = new mongoose.Schema({
    element: {type: String, require: true}
})
module.exports = mongoose.model('todoElement', todoElement);