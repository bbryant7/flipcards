const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/vendingdb');
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// const vendingMachine = require('./models/inventory.js');
const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get ('/login', function(req, res) {
  res.render('login')
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
