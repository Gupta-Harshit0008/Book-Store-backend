exports.userController=(req,res)=>{
    console.log(req.body)
    res.status(200).json({
      status:'success',
      message:'user Details fetched',
    })
  }
