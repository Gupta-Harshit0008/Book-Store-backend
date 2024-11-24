const express= require('express')
const bookController= require('../controllers/booksController')
const authController=require('../controllers/authController')

const books= express.Router();
books.route('/Bookname').post(authController.isUserLoggedIn,bookController.getBookByName)
books.route('/').post(authController.isUserLoggedIn,bookController.getAllbooksController)
books.route('/addNewBook').post(authController.isUserLoggedIn,bookController.AddBooks)
books.route('/:id').post(authController.isUserLoggedIn,bookController.getBookByID)


module.exports=books