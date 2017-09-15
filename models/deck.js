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

// Option 2

// const flipDeck = new mongoose.Schema({
//         decktitle: {type: String, required: true, unique: true},
//         cards: [{
//           question: String,
//           answer: String,
//           correct: false
//         }]
// })

const decks = mongoose.model('decks', flipDeck);

module.exports = decks;
