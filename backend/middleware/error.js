const ErrorHandler=require('../utils/errorhandler')

module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";

    
    // Wrong Mongo Db Id Error
    if(err.name=="CastError"){
        const message= `Resource Not Found. Invalid ${err.path}`;
        err=new ErrorHandler(message,400) 
    }

    // Duplicate Email Error
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }

    // Wrong Json Web Token Error
    if(err.name=="JsonWebTokenError"){
        const message= `Json Web Token is Invalid Try Again`;
        err=new ErrorHandler(message,400) 
    }

    // JWT Expire Error
    if(err.name=="TokenExpiredError"){
        const message="Json Web Token is Expired";
        err=new ErrorHandler(message,400);
    }

    
    res.status(err.statusCode).json({
        success:false,
        message:err.message,

        //  We can use err.stack to know the exact location of the error at which position error is found

    });
};