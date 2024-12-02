const mongoose=require('mongoose')

const BookSoldSchema= new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:true
},
bookId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'books',
    required:true
},
quantity:{
    type:Number,
    required:true
},
purchasedAt:{
    type:Date,
    default:Date.now()
}
})

const BookSold=mongoose.model('BookSold',BookSoldSchema)

module.exports=BookSold