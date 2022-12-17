//jshint esversion:6

//Main constants
const express = require('express');
const bdParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/todolist');
const port = 3000;

const Schema = mongoose.Schema;
const model = mongoose.model;

const app = express();

const allTasks = [];

//Uses
app.use(bdParser.urlencoded({
    extended: false
}));
app.use(express.static('public'));

//Settings
app.set('view engine', 'ejs');

/********************* */

//Set up of DB for tasks
const Tasks = new Schema({
    name: {
        type: String,
        required: true
    },
    dateCreated: Date
})

const Task = model('Task', Tasks);

/********************* */






//Getting the data from the Front
app.get('/', (req, res) => {



    //TEST
    Task.find({}, (err, allTasks) => {
        if (err) console.log(err);

        res.render('index', {
            newTask: allTasks,
            itsToday: new Date
        });

    });


})


//Posting the data from the back
app.post('/', (req, res) => {


    //Add a new task to the array
    const newTask = new Task({
        name: req.body.addTaskInput,
        dateCreated: new Date()
    })

    newTask.save();

    //refresh the page just after pushing the data to the array
    res.redirect('/');

})


//every thing that go to the back end on the server, on a log
app.listen(port, () => {



    console.log('currently listening on port : ' + port);
});