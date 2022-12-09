//jshint esversion:6

//Main constants
const express = require('express');
const bdParser = require('body-parser');
const ejs = require('ejs');
const port = 3000;
const app = express();
let allTasks = [];

//Uses
app.use(bdParser.urlencoded({
    extended: false
}));
app.use(express.static('public'));


//Settings
app.set('view engine', 'ejs');



//Getting the data from the Front
app.get('/', (req, res) => {

    const date = new Date();
    const dateLocal = date.getDay();
    let quote = "";

    if (dateLocal === 6 || dateLocal === 0) {
        quote = "Yeah on est la fin d'semaine";
    } else {
        quote = "Let's go on se magne pour se trouver une job";
    }

    res.render('index', {
        itsToday: quote,
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


//every thing that go to the back end on the server, on a loge
app.listen(port, () => {
    console.log('currently listening on port : ' + port);
});