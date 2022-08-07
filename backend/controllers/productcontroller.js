const Product=require('../models/productModels')
const ErrorHandler = require('../utils/errorhandler')
const theFunc=require('../middleware/catchAsyncErrors')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

//  Create a new product put request --- used
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    req.body.user=req.user.id;
    const product=await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
});

//  Get all products
exports.getAllProducts=catchAsyncErrors(async(req,res)=>{

    const resultsPerPage=10;
    const productCount=await Product.countDocuments();
    const apifeatures=new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultsPerPage)
    const products=await apifeatures.query
    res.status(200).json({
        success:true,
        products,
        productCount,
        resultsPerPage
    })
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


// Create new Review or Update the Review 
exports.createProductReview=catchAsyncErrors(async(req,res,next)=>{
    const {rating,comment,productID}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product=await Product.findById(productID)
    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());
    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user._id.toString()){
                rev.rating=rating,
                rev.comment=comment
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numberofReviews=product.reviews.length
    }

    // Find Average Rating of a given Product
    let avg=0;
    product.reviews.forEach(rev=>{
        avg=avg+rev.rating;
    });
    avg/=product.reviews.length;
    product.ratings=avg;

    const numberofReviews=reviews.length;
    await product.save({ validateBeforeSave:false});
    res.status(200).json({
        success:true,
        product
    })
});

// Get All Product Review of any single Product
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product does not exist"));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
});



// Delete Review
exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.productID);
    if(!product){
        return next(new ErrorHandler("Product does not exist"));
    }
    const reviews=product.reviews
    .filter(rev=>rev._id.toString()!=req.query.id.toString());
    
    // As Some of the reviews are deleted we will find the average again
    // Find Average Rating of a given Product
    let avg=0;

    reviews.forEach((rev)=>{
        avg=avg+rev.rating;
    });
    avg/=(product.reviews.length);

    console.log(1000)
    const ratings=avg;
    const numberofReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productID,{
        reviews,
        ratings,
        numberofReviews
    }, 
    {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
    })
});