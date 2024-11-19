const express= require('express')
const bookController= require('../controllers/booksController')
const authController=require('../controllers/authController')

const booksCart= express.Router();

booksCart.route('/addingBooksToCart').post(authController.isUserLoggedIn,bookController.addingBooksToCart)
booksCart.route('/itemsInCart').post(authController.isUserLoggedIn,bookController.ItemsinCart)
booksCart.route('/deleteItemFromCart').delete(authController.isUserLoggedIn,bookController.deleteItemFromCart)
module.exports=booksCart