const jwt=require('jsonwebtoken')

const signToken= Id =>{
   return jwt.sign({Id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY_IN})
}

module.exports=signToken
