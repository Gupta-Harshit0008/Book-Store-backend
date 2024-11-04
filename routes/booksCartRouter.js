const express= require('express')
const bookController= require('../controllers/booksController')

const booksCart= express.Router();

booksCart.route('/addingBooksToCart').post(bookController.addingBooksToCart)

module.exports=booksCart