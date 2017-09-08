const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/flipCarddb');
const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const userData = require('./models/userdata.js');
const flipDeck = require('./models/deck.js');
const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


// get decks: list of links
app.get ('/', function(req, res) {
  flipDeck.find().then(function(results) {
    res.render('home',{decks: results})
  })

 })

// // get specific deck to use (from link)
app.get ('/deckdetails', function(req, res) {
  res.render('deckdetails')
})
//
// create new deck
app.post ('/', function(req, res){
const newDeck = new flipDeck({
  decktitle: req.body.title,
  cards: [{
    question: req.body.question,
    answer: req.body.answer,
    correct: false
  }]
})
newDeck.save()
  res.render()
})

//TODO Routes
// // create new card inside specific deck
// app.post ('/', function(req, res){
//   res.render()
// })
//
// // edit a card inside specific deck
// app.put ('/', function(req, res){
//   res.render()
// })
//
// // delete a card inside specific deck
// app.delete ('/', function(req, res){
//   res.render()
// })



app.listen(3000, function() {
  console.log('Successfully started express application!');
})


process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
