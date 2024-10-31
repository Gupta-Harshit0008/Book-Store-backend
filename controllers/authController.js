const user=require('../Modals/userModal')

// signup controller
exports.signUpConroller= async(req,res)=>{
    try{
        const userData={
            userName:req.body.userName,
            password:req.body.password,
           email:req.body.email,
           confirmPassword:req.body.confirmPassword
        }
        

        if (userData){
            if(userData.password !== userData.confirmPassword){
                res.status(400).json({
                    status:'failure',
                    message:'Please Enter Password and Confirm Password correctly'
                })
            }
            else{
                const usersdata= await user.create(userData)
                res.status(200).json({
                    status:'success',
                    message:'user registered successfully',
                    usersdata
                })
            }
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

exports.loginController= async (req,res)=>{
    try{ 
            email=req.body.email
            password=req.body.password
            if(!email || !password){
               return res.status(400).json({
                    status:'failure',
                    message:'Please enter your email or password'
                })
            }
        const data=await user.findOne({email})
        if (!data || !(password === data.password)){
          return res.status(403).json({
                status:'failure',
                message:' No user Found'
            })
        }
        res.status(200).json({
            status:'success',
            message:'User logeddin'
        })
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message:'pls enter corrcet creds.'
        })
    }
}