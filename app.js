const express= require('express');
const morgan = require('morgan');
const cors =require('cors')
const cookieParser=require('cookie-parser')

const authRouter=require('./routes/authrouter')
const booksRouter= require('./routes/booksRouter')
const userRouter=require('./routes/userRouter')
const booksCartRouter=require('./routes/booksCartRouter')

const app=express();

const allowedOrigins = ['http://localhost:4200', 'https://your-production-url.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true               
  };
 
  
// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser());
app.use(cors(corsOptions));

// routes

app.use('/',authRouter)
app.use('/books',booksRouter)
app.use('/userDetails',userRouter)
app.use('/',booksCartRouter)
module.exports=app
