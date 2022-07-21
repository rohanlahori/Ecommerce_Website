const Order=require('../models/orderModel')
const Product=require('../models/productModels')
const ErrorHandler=require('../utils/errorhandler')
const catchAsyncErrors=require('../middleware/catchAsyncErrors')


// Add new Order
exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    console.log(100);
    const 
    {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body;

    const order= await Order.create(
        {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id
        }
    )
    // console.log(req.body)
    res.status(201).json({
        success:true,
        order
    })
})



// Get Single Order Details
exports.getSingleOrder=catchAsyncErrors(async(req,res,next)=>
{
    const order=await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this id"),404);
    }

    res.status(200).json({
        success:true,
        order
    })
});


// Get Logged In User Orders
exports.myOrders=catchAsyncErrors(async(req,res,next)=>
{
    console.log(req.user._id);
    const orders=await Order.find({user:req.user._id});
    res.status(200).json({
        success:true,
        orders
    })
});


// Get All Orders ---- Admin
exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>
{
    const orders=await Order.find()
    let total_amt=0;
    orders.forEach((it)=>{
        total_amt+=it.totalPrice;
    })

    res.status(200).json({
        success:true,
        orders,
        total_amt
    });
});

async function updateStock(id,quantity){
    const product=await Product.findById(id);

    product.stock-=quantity;
    await product.save();
}


// Update Order Status ---- Admin
exports.updateorderStatus=catchAsyncErrors(async(req,res,next)=>
{
    const order=await Order.findById(req.params.id);
    console.log(order)
    if(order.orderStatus=="Delivered")
    {
        return next(new ErrorHandler("Order is already Delivered"),404);
    }
    order.orderItems.forEach(async (it)=>{
        await updateStock(it.product,it.quantity)
    })
    order.orderStatus=req.body.status;
    if(req.body.status=="Delivered"){
        order.deliveredAt=Date.now();
    }

    await order.save({validatebeforeSave: false})
    res.status(200).json({
        success:true,
        order
    })
});



// Delete Order ---- Admin
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>
{
    const order=await Order.findById(req.params.id)
    console.log(req.params.id);
    if(!order){
        return next(new ErrorHandler("Such an order does not exist",404))
    }
    await order.remove();
    res.status(200).json({
        success:true,
        order,
    })
});