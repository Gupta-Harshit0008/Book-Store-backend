const Cart = require('../Modals/booksCartModal')
const user=require('../Modals/userModal')
const BookSold=require('../Modals/bookSoldModal')
const Book=require('../Modals/booksModal')
const signToken=require('../utils/jwtTokenUtil')
const mongoose=require('mongoose')

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
  // API for proceed to Buy 
  exports.purchaseorder = async (req, res) => {
    try {
      const { userId, booksdetails } = req.body;
      // Validate userId
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          status: 'failure',
          message: 'Invalid or missing userId.',
        });
      }
  
      // Check if the user exists
      const userData = await user.findById(userId);
      console.log(userData)
      if (!userData) {
        return res.status(404).json({
          status: 'failure',
          message: 'User not found. Please provide a valid userId.',
        });
      }

      // Validate booksdetails array
      if (!Array.isArray(booksdetails) || booksdetails.length === 0) {
        return res.status(400).json({
          status: 'failure',
          message: 'Booksdetails must be a non-empty array.',
        });
      }
  
      const orders = [];
  
      for (const book of booksdetails) {
        const { bookId, quantity } = book;
  
        // Validate bookId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
          return res.status(400).json({
            status: 'failure',
            message: `Invalid bookId: ${bookId}`,
          });
        }
  
        // Check if the book exists
        const bookData = await Book.findById(bookId);
        if (!bookData) {
          return res.status(404).json({
            status: 'failure',
            message: `Book not found for bookId: ${bookId}`,
          });
        }
  
        // Save order details
        const savedOrder = await BookSold.create({
          userId,
          bookId,
          quantity
        });
        orders.push(savedOrder);
      }
  
      res.status(201).json({
        status: 'success',
        message: 'Orders placed successfully.',
        data: orders,
      });
      const deleteData=await Cart.deleteMany({userId})
    } catch (error) {
      console.error('Error in purchaseOrderDetails:', error.message);
      res.status(400).json({
        status: 'failure',
        message: 'An error occurred while placing the order.',
        error: error.message,
      });
    }
  };
  
// order history details
  exports.purchaseorderdetails=async (req,res)=>{
    try{
      const userid=req.body.userId
      const userData=await user.findById(userid)
      if(!userData){
       return res.status(400).json({
          status:'failure',
          message:'in-corect user details , Kindly login with correct details'
        })
      }
    
      const purchasedDetails= await BookSold.find({userId:userid})
      if(purchasedDetails.length<1){
        return res.status(204).json({
          status:'success',
          message:'No purchase history',
          
        })
      }
      const BookDetails=[]
      for(const details of purchasedDetails){
        const bookName= await Book.findById(details.bookId,'_id name Author')
        BookDetails.push(bookName)
      }
    return  res.status(200).json({
        status:'success',
        message:'order purchased successfully',
        purchasedDetails,
        BookDetails
      })
    }
    catch(err){
     return res.status(400).json({
        status:'failure',
        message:'some error occoured',
        err
      })
    }
        
      }
