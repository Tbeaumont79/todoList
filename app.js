//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const app = express();
const todoElement = require('./routes/todoElement')
const about = require('./routes/about')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/todolistDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


app.get("/about", about);
app.get("/", todoElement);
app.delete("/", todoElement);
app.post("/delete", todoElement);


app.get("/about", about);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
