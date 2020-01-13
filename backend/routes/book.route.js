const express = require('express');
const app = express();
const bookRoute = express.Router();

// Book model
let Book = require('../model/Book');

const { Genres } = require('../model/Book');

// Add Book
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Book successfully added!')
        }
    })
});

// Get all genres
bookRoute.route('/genres').get((req, res) => {
    res.json(Genres);
});

// Get all books
bookRoute.route('/').get((req, res) => {
    Book.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

// Get single book
bookRoute.route('/get-book/:id').get((req, res) => {
    Book.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});


// Update book
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Book successfully updated!')
        }
    })
});

// Delete book
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
            console.log('Book successfully deleted!')
        }
    })
});

module.exports = bookRoute;
