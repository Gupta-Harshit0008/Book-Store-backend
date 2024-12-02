const express= require('express')
const bookController= require('../controllers/booksController')
const authController=require('../controllers/authController')
const userController=require('../controllers/userController')

const booksCart= express.Router();

booksCart.route('/addingBooksToCart').post(authController.isUserLoggedIn,bookController.addingBooksToCart)
booksCart.route('/itemsInCart').post(authController.isUserLoggedIn,bookController.ItemsinCart)
booksCart.route('/deleteItemFromCart').delete(authController.isUserLoggedIn,bookController.deleteItemFromCart)
booksCart.route('/order/purchaseorder').post(userController.purchaseorder)
booksCart.route('/order/purchaseorderdetails').post(userController.purchaseorderdetails)
module.exports=booksCart