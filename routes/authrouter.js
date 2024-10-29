const express= require('express')
const authController= require('../controllers/authController')

const auth= express.Router()


auth.route('/signUp').post(authController.signUpConroller)
auth.route('/login').post(authController.loginController)

module.exports=auth