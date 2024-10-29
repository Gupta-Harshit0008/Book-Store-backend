const express= require('express');
const morgan = require('morgan');
const cors =require('cors')

const authRouter=require('./routes/authRouter')
const booksRouter= require('./routes/booksRouter')

const app=express();

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())



// routes

app.use('/',authRouter)
app.use('/books',booksRouter)

module.exports=app
