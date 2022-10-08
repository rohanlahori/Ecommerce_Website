const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User=require('../models/userModels')
const sendToken=require('../utils/jwttoken')
const sendEmail=require('../utils/sendEmail')
const crypto=require('crypto');
const { raw } = require('body-parser');



// Register a user
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;

    // const myCloud=await cloudinary.v2.uploader(req.body.avatar,{
    //     folder:"samples",
    //     width:20,
    //     crop:"scale"
    // })

    const user=await User.create({
        name,email,password,
        // avatar:{
        //     public_id:myCloud.public_id,
        //     url:myCloud.secure_url
        // }
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
    console.log(req.body.email);
    if(!user){
        return next(new ErrorHandler("User Not Found",404));
    }
    const resetToken=user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message=`Your password reset token is :-\n\n ${resetPasswordUrl}\n\n If you have not requested this
    email, Please Ignore it `

    try{
        await sendEmail({
            email:user.email,
            subject: `Eccommerce Password Recovery`,
            message 
        });
        
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        });
    }
    catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
    }
})



// Reset Password
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    
    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
    console.log(resetPasswordToken)
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })

    if(!user){
        return next(new ErrorHandler("Reset Password Token is Invalid or has been expired",400))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password Does not match",400));
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res)
});


// Get User Details'


exports.getUserdetails=catchAsyncErrors(async (req,res,next)=>{
    const user=await User.findById(req.user.id);
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
    res.status(200).json({
        success:true,
        user
    });
});


// Update Password
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    console.log(user);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",401))
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        console.log("Checking checking")
        return next(new ErrorHandler("Password and Confirm Password doesn't match",401))
    }
    user.password=req.body.confirmPassword;
    await user.save();
    // Save the whole data in database
    sendToken(user,200,res);
});


// Update User Porfile
exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.updateProfileName,
        email:req.body.updateProfileEmail
    }
    const user=await User.findById(req.user.id);
    user.name=newUserData.name;
    user.email=newUserData.email;
   



    // Alternate Way of updating the profile 

    // const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    //     new:true,
    //     runValidators:true,
    //     useFindAndModify:false
    // });
    
    
    // Save the whole data in database
    await user.save();
    sendToken(user,200,res);
});


// Get Single User Details
exports.getSingleUser=catchAsyncErrors(async (req,res,next)=>{

    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("User with this Id does not Exists"));
    }

    res.status(200).json({
        success:true,
        user
    });
});
// Get All user (admin)
exports.getAllUsers=catchAsyncErrors(async (req,res,next)=>{

    const users=await User.find();

    res.status(200).json({
        success:true,
        message:`This is the list of all the users`,
        users
    });
});


// Admin wants to update the role of any user

// Update User Role By Admin
exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    
    
    // Save the whole data in database
    await user.save();
    sendToken(user,200,res);
});


// Delete Any User Admin
exports.deleteUserProfile=catchAsyncErrors(async(req,res,next)=>{
    
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User with this ${req.params.id} does not exist`));
    }

    await user.remove()
    // Delete a user from the database

    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    });
})