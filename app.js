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
const ObjectId = require('mongodb').ObjectId;


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

 // ++++++++++++++++++++++++++++++++++++++++++

// get decks: list of links [X]
app.get('/', function(req, res) {
  flipDeck.find().then(function(results) {
    res.render('home', {
      decks: results
    })
  })
})

// get specific deck to use [X]
app.get('/deckdetails/:id', function(req, res) {
  flipDeck.findOne().where({
    _id: (req.params.id)
  }).then(function(results) {
    res.render('deckdetails', {
      deck: results
    })
  })
  console.log(req.params.id)
});


// create new deck [X]
app.post('/newdeck', function(req, res) {
  const newDeck = new flipDeck({
    decktitle: req.body.decktitle,
    cards: [{
      question: req.body.question,
      answer: req.body.answer,
      correct: false
    }]
  })
  newDeck.save().then(function() {
    return flipDeck.find()
    console.log('step2')
  }).then(function(results) {
    console.log('step3')
    res.render('home', {
      decks: results
    })

  })

});

// create new card inside specific deck
// TODO - only show card details for this deck
app.post('/addcard/:id', function(req, res){
  let newCard = {question: req.body.newquestion,
    answer: req.body.newanswer,
    correct:false};

  flipDeck.findOneAndUpdate({_id: req.params.id},{$push:{cards: newCard}}).then(function (){
    return flipDeck.find()
  }).then (function(results){
    res.render("deckdetails", {deck:results})
  })
});

// Delete Deck [X]
app.post('/deletedeck/:id', function(req, res) {
  flipDeck.deleteOne().where({
      _id: (req.params.id)
    }).then(function() {
      return flipDeck.find()
    }).then(function(results) {
      res.render('home', {decks: results})
    })
})

// TODO - filter through so only one shows at a time
// Study a deck
app.get('/study/:id', function(req, res) {
  flipDeck.findOne().where({
    _id: (req.params.id)
  }).limit(1).then(function(results) {
    res.render('study', {
      deck: results
    })
  })

});


//TODO Routes


// from tasks:
// app.put("/api/activities/:id", function(req, res) {
//     bStat.updateOne({task:req.params.task}, {$push: {stat: req.body}})
//       .then(function(results){
//         res.json({status: 'success', stat: results})
//       })
//       .catch(function(error){
//         console.log(error);
//       })
// });



//
// // edit a card inside specific deck
// app.put('/editcard', function(req, res){
//   res.render()
// })

// // delete a card inside specific deck
;


app.post('/deletecard/:id', function(req, res) {
  flipDeck.findById('59b71072ea852e6b1d001c63',function (error) {if (error) console.log(error);
  console.log("User Found!");

})
    .then(function() {
      console.log("card id", req.params.id);
      console.log('coleslaw');
      return flipDeck.find()
    }).then(function(results) {
      res.render('deckdetails', {
        deck: results
      })
    })
  console.log("card id", req.params.id);
  console.log('potato');
})





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
