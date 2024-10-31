const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'User name is mandatory']
    },
    password:{
        type:String,
        required:[true, 'User must enter password']
    },
    email:{
        type:String,
        required:[true,'User must have an Email']
    }
})

const User= mongoose.model('User',userSchema)

module.exports=User;