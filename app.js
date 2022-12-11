//jshint esversion:6

//Main constants
const express = require('express');
const bdParser = require('body-parser');
const ejs = require('ejs');
const port = 3000;
const app = express();

//We still can push tasks to array, but we can't reassign it.
const allTasks = [];

//Uses
app.use(bdParser.urlencoded({
    extended: false
}));
app.use(express.static('public'));


//Settings
app.set('view engine', 'ejs');



//Getting the data from the Front
app.get('/', (req, res) => {

    const date = new Date().toLocaleDateString('fr-CA', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    res.render('index', {
        itsToday: date,
        newTask: allTasks
    });

})


//Posting the data from the back
app.post('/', (req, res) => {

    //Add a new task to the array
    allTasks.push(req.body.addTaskInput);

    //refresh the page just after pushing the data to the array
    res.redirect('/');

})


//every thing that go to the back end on the server, on a log
app.listen(port, () => {



    console.log('currently listening on port : ' + port);
});