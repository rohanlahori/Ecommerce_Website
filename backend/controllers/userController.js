const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User=require('../models/userModels')
const sendToken=require('../utils/jwttoken')
// Register a user

exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepic"
        }
    });

    // Passing the token as a cookie
    sendToken(user,201,res);
})


// Login User

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please give Email and password",400))
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }
    sendToken(user,200,res);
})


// Logout User

exports.logout=catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"Logged Out Successfully"
    });
});

// Forgot Password
exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User Not Found",404));
    }

    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}
    ://${req.get("host")}/api/v1/password/reset/
    ${resetToken}`;

    const message=`Your password reset token is :- \n\n ${resetPasswordUrl}\n\n If you have not requested this
    email, Please Ignore it `

    try{

    }
    catch(err){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        
        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500))
    }
})