const book= require('../Modals/booksModal')
const Cart = require('../Modals/booksCartModal')
const signToken=require('../utils/jwtTokenUtil')

// getAllBooks
exports.getAllbooksController= async (req,res)=>{
    try{
        const getAllBooks= await book.find({}, 'name price Author bookImage' );
if(!getAllBooks){
    res.status(204).json({
        status:'failure',
        message:'No Data Found',
        books_data:getAllBooks
    })
}
            res.status(200).json({
                status:'success',
                message:'All Books fecthed successfully',
                books_data:getAllBooks
            })
    }
    catch(err){
            res.status(204).json({
                status:'failure',
                message:'No Data Found'
            })
    }
}

// find a book using ID
exports.getBookByID= async(req,res)=>{
    try{
        const bookId=req.body.Bookid
        const bookByID= await book.findById(bookId)
        if(!bookByID){
            res.status(404).json({
                status:'failure',
                message:'No Data Found'
            })
        }
        else{
            res.status(200).json({
                status:'success',
                message:'Book fecthed successfully',
                book:bookByID
            })
        }
        
    }
    catch(err){
        res.status(404).json({
            status:'failure',
            message:err
        })
    }
}

//  for adding new Book

exports.AddBooks= async (req,res)=>{

try{
    const newBook= await book.create({
        name:req.body.name,
        price:req.body.price,
        Author:req.body.Author,
        datePublished:req.body.datePublished,
        quantity:req.body.quantity,
        desc:req.body.desc,
        publisher:req.body.publisher,
        language:req.body.language
    })
    res.status(200).json({
        status:'success',
        message:'A new book added successfully',
        book:newBook
    })
}
catch(err){
    res.status(400).json({
        status:'failure',
        message:err.message
    })
}
}

// for adding books to cart
exports.addingBooksToCart= async (req,res)=>{
    try{
        const bookByID= await book.findById(req.body.bookId)  
        if (req.body.quantity < bookByID.quantity){
            const cartItem= await Cart.find({bookId:req.body.bookId,userId:req.body.userId})
    if(cartItem.length>0)
    {
        const updateCart=await Cart.findByIdAndUpdate(cartItem[0]._id,{quantity:req.body.quantity,updateAt:Date.now()},{ new: true })
        res.status(200).json({
            status:'success',
            message:'Item updated to cart successfully',
            updateCart
          })
    }
    else{
        const bCart=await Cart.create({
            bookId:req.body.bookId,
            userId:req.body.userId,
            quantity:req.body.quantity
        })
        res.status(200).json({
            status:'success',
            message:'Item added to cart successfully',
            bCart
          })
    
    }
        }
        else{
            res.status(400).json({
                status:'failure',
                message:'qunaity entered is more then in our stock'
              })
        }    
    }
    catch(err){
        res.status(400).json({
            status:'failure',
            message:'some error occoured'
          })
    }
    }

// fecthing cart Items for a particular user
exports.ItemsinCart=async (req,res)=>{
    try{
        const Items= await Cart.find({userId:req.body.userId},'bookId quantity _id')
        const bookIds = Items.map(item => item.bookId);
        const cartItemsDetails = await book.find(
            { _id: { $in: bookIds } }, // Finds books with _id in the bookIds array
            'name price Author _id bookImage'     // Selects only the specified fields
        );
        res.status(200).json({
            status:'success',
            message:'details fetched successfully',
            cartItemsDetails,
            Items
          })
}
    catch(err){
        res.status(404).json({
            status:'failure',
            message:'No data found',
          })
    }
 
    }

    // deleted items for a particular user in Cart
exports.deleteItemFromCart=async (req,res)=>{
    try{
        const Items= await Cart.findByIdAndDelete({_id:req.body.itemId})
        if(!Items){
            return res.status(404).json({
                status:'failure',
                message:'No Items Found',
              })    
        }
        res.status(200).json({
          status:'success',
          message:'item Deleted SuccessFully',
          Items
        })
    }
        catch{
            res.status(404).json({
                status:'failure',
                message:'No Items Found',
              })   
        }
      } 