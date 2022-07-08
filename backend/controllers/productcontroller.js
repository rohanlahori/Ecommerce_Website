const Product=require('../models/productModels')

//  Create a new product put request --- used
exports.createProduct = async(req,res,next)=>{
    const product=await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
}

//  Get all products
exports.getAllProducts=async(req,res)=>{
    const product=await Product.find()
    console.log(product)

    res.send(product)
}

// Update Product -- Admin Route

exports.updateProducts=async(req,res,next)=>{
    let products= await Product.findById(req.params.id)

    if(!products){
        return res.status(500).json({
            success: false,
            message: "Product Not found"
        })
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
}

exports.deleteProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id)
    

    if(!product){
        return res.status(500).json({
            success:"false",
            message:"Product Not found"
        })
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product deleted Successfully"
    })
}