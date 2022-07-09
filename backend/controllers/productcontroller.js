const Product=require('../models/productModels')
const ErrorHandler = require('../utils/errorhandler')
const theFunc=require('../middleware/catchAsyncErrors')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
//  Create a new product put request --- used
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
});

//  Get all products
exports.getAllProducts=catchAsyncErrors(async(req,res)=>{
    const product=await Product.find()
    console.log(product)

    res.send(product)
});

// Update Product -- Admin Route

exports.updateProducts=catchAsyncErrors(async(req,res,next)=>{
    let products= await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    products= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success: true,
        products,
    })
});

exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    let product=await Product.findById(req.params.id)
    

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product deleted Successfully"
    })
});


//  Get Single Product Details

exports.getSingleProduct=catchAsyncErrors(async(req,res,next)=>{
    let product=await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    res.status(200).json({
        success:true,
        product
    })
});