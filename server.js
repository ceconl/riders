const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

//Mongo setup
const MongoClient = require('mongodb').MongoClient

var db

var studentArray = [];
var assignedLetter = 'A';

MongoClient.connect('mongodb://teacher:kids@ds145329.mlab.com:45329/students', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
    db.collection('students').find().toArray((err, result) => {
        if (err) return console.log(err)
        //render index.ejs
        res.render('index.ejs', {students: result})
    })
})

app.post('/riders', (req, res) => {
    db.collection('students').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})

app.post('/line', (req, res) => {
    console.log(req.body);
    var collection = db.collection('students');
    collection.findOne({riderNumber:req.body.riderNumber}, function(err, result) {
        if (err) return console.log(err)
        console.log(result)
        studentArray.push(result.body);
        console.log(studentArray[0] + assignedLetter);
        res.redirect('/')
    })
})

app.get('/riders/get', (req, res) => {
    db.collection('students').find().toArray(function(err, results) {
        console.log(results);
    })
})