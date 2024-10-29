const book= require('../Modals/booksModal')

exports.getAllbooksController= async (req,res)=>{
    try{
        const getAllBooks= await book.find({}, 'name price Author' );
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

exports.getBookByID= async(req,res)=>{
    try{
        const bookByID= await book.findById(req.params.id)
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
