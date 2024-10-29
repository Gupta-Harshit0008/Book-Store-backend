const mongoose=require('mongoose')

const BookSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A Book must have a Name'],
    },
    price:{
        type:Number,
        required:[true,'A Book must have a price']
    },
    Author:{
        type:String,
        required:[true,'A Book must have a Author name']
    },
    datePublished:{
        type:Date,
        default:Date.now
    },
    quantity:{
        type:Number
    },
    desc:{
        type:String,
        required:[true, ' A Book must have some Desc. ']
    },
    publisher:{
        type:String,
        required:[true, ' A Book must have a publisher']
    },
    language:{
        type:String
    }

})

const Book= mongoose.model('Book',BookSchema)

module.exports=Book