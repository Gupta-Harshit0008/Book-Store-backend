const user=require('../Modals/userModal')

exports.userController=async (req,res)=>{
  try{
    email=req.body.email
const userDetails=await user.findOne({email},'_id userName email isAdmin')
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
    userDetails
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
