// signup controller
exports.signUpConroller=(req,res)=>{
    try{
        if(req.body){
            res.status(200).json({
                status:'success',
                message:'User registered successfully'
            })
        }
        else{
            res.status(400).json({
                status:'failure',
                message:'Please enter all details correctly'
        })
        }
        
    }
    catch(err){
        res.status(400).json({
                status:'failure',
                message:'Please enter all details correctly'
        })
    }
    
}

// login controller

exports.loginController=(req,res)=>{
    try{
if(req.body){
    res.status(200).json({
        status:'success',
        message:'user login successfull'
    })
}
else{
    res.status(400).json({
        status:'fail',
        message:'pls enter corrcet creds.'
    })
}
       
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message:'pls enter corrcet creds.'
        })
    }
}