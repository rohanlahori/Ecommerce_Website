const app = require("./app");
const dotenv=require('dotenv')
const connectDb=require("./config/database")
const cloudinary=require("cloudinary")
// Handling Uncaught Exceptions

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server")
    process.exit(1)
})


dotenv.config({path:"backend/config/.env"})
// Connecting to Database
connectDb()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on ${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server")

    server.close(()=>{
        process.exit(1)
    })
})

process.on("Unhandlederror",err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server")

    server.close(()=>{
        process.exit(1)
    });
})