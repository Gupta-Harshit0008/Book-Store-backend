const mongoose=require('mongoose');

const CartSchema= new mongoose.Schema({
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
        required:true,
        default:0
    },
    addedAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date
    }
})

const Cart= mongoose.model('Cart',CartSchema)

module.exports=Cart;