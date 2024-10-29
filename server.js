const app= require('./app')
const dotenv=require('dotenv');
const mongoose=require('mongoose')

dotenv.config({path:'./config.env'})

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.connect(DB).then(()=>{
    console.log('Database connection Successfull')
})

port=process.env.PORT

// server
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})