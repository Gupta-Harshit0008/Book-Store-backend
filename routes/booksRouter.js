const express= require('express')
const bookController= require('../controllers/booksController')


const books= express.Router();
books.route('/').get(bookController.getAllbooksController)
books.route('/addNewBook').post(bookController.AddBooks)
books.route('/:id').post(bookController.getBookByID)

module.exports=books