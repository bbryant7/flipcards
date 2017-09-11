const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  question: String,
  answer: String,
  correct: false
})

const flipDeck = new mongoose.Schema({
        decktitle: {type: String, required: true, unique: true},
        cards: [cardSchema]
})

const decks = mongoose.model('decks', flipDeck);

module.exports = decks;
