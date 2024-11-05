const express= require('express')
const bookController= require('../controllers/booksController')

const booksCart= express.Router();

booksCart.route('/addingBooksToCart').post(bookController.addingBooksToCart)
booksCart.route('/itemsInCart').post(bookController.ItemsinCart)
module.exports=booksCart