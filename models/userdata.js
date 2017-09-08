const mongoose = require('mongoose');

const userData = new mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true}
  })

const users = mongoose.model('users', userData);

module.exports = users;
