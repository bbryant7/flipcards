const mongoose = require('mongoose');

const flipDeck = new mongoose.Schema({
        decktitle: {type: String, required: true, unique: true},
        cards: [{
          question: String,
          answer: String,
          correct: false
        }
      ]
})

const decks = mongoose.model('decks', flipDeck);

module.exports = decks;
