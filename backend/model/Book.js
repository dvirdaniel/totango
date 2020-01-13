const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Genres = Object.freeze({
    science_fiction: 'Science Fiction',
    satire: 'Satire',
    drama: 'Drama',
    action: 'Action',
    romance: 'Romance',
    mystery: 'Mystery',
    horror: 'Horror',
});

// Define collection and schema
let Book = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    iSBN: {
        type: Number
    },
    author: {
        type: String
    },
    genre: {
        type: String,
        enum: Object.keys(Genres),
    },
    price: {
        type: Number
    },
    publicationDate: {
        type: Date
    }
}, {
    collection: 'books'
});

Object.assign(Book.statics, {
    Genres,
});

module.exports = mongoose.model('Book', Book)

/*
const book = mongoose.model('Book', Book);

const genre = mongoose.model('Genre', Genre);

module.exports = {
    book: book,
    genre: genre
}*/
