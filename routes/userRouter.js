  const express= require('express')
  const usercontroller= require('../controllers/userController')

  const user=express.Router();
  user.route('/').post(usercontroller.userController)

  module.exports=user