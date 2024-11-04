const express= require('express');
const morgan = require('morgan');
const cors =require('cors')

const authRouter=require('./routes/authRouter')
const booksRouter= require('./routes/booksRouter')
const userRouter=require('./routes/userRouter')
const booksCartRouter=require('./routes/booksCartRouter')

const app=express();

const corsOptions = {
    origin: 'http://localhost:4200', // allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
 
  
// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions));


// api for fetching data from Cart
app.post('/books/booksInCart',(req,res)=>{

})


// routes

app.use('/',authRouter)
app.use('/books',booksRouter)
app.use('/userDetails',userRouter)
app.use('/',booksCartRouter)
module.exports=app
