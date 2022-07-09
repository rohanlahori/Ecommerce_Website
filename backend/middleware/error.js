const ErrorHandler=require('../utils/errorhandler')

module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";

    // Wrong Mongo Db Id Error
    if(err.name=="CastError"){
        const message= `Resource Not Found. Invalid ${err.path}`;
        err=new ErrorHandler(message,400) 
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,

        //  We can use err.stack to know the exact location of the error at which position error is found

    });
};