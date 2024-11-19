  const express= require('express')
  const usercontroller= require('../controllers/userController')
  const authcontroller= require('../controllers/authController')


  const user=express.Router();
  user.route('/').post(authcontroller.isUserLoggedIn,usercontroller.userController)

  module.exports=user