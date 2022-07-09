const mongoose=require('mongoose')

const connectDb=()=>{
    // console.log("")
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,
    })
    .then((data)=>{
        console.log("mongo db connected to the server")
    })
    // No need for catch block as the error is handles in unhandled Rejections

}

module.exports=connectDb