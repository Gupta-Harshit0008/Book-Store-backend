const Cart = require('../Modals/booksCartModal')
const user=require('../Modals/userModal')
const signToken=require('../utils/jwtTokenUtil')


exports.userController=async (req,res)=>{
  try{
    email=req.body.email
const userDetails=await user.findOne({email},'_id userName email isAdmin')
const userId=userDetails._id
const cartCount = await Cart.find({userId})
if(!userDetails){
  res.status(404).json({
    status:'failure',
      message:'no user found',
  })
}
else{
  res.status(200).json({
    status:'success',
    message:'user Details fetched',
    userDetails,
    CartCount:cartCount.length
  })
}
    
  }
  catch(err){
    res.status(400).json({
      status:'failure',
        message:'Please enter correct details',
  })
}
  }
