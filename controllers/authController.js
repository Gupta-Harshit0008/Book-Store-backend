const user=require('../Modals/userModal')
const signToken=require('../utils/jwtTokenUtil')
const util=require('util')
const jwt=require('jsonwebtoken')


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
        const token=signToken(data._id)
        res.status(200).json({
            status:'success',
            message:'User logeddin',
            token
        })  
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message:'pls enter corrcet creds.'
        })
    }
}

//logout API

exports.logout= (req,res) =>{
    res.clearCookie('token');
    res.status(200).json({
        status:'success',
        message:'User successfully logged Out'
    })
}

exports.isUserLoggedIn= async(req,res,next)=>{
   let token;
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1]
}
    if(!token){
      return res.status(401).json({
            status:'unauthorized',
            message:'kindly login to access'
        })
    }
    try{
     const decode= await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
    }
    catch{
        return res.status(401).json({
            status:'unauthorized',
            message:'kindly re-login to access .. !!'
        })
    }
    next();
}