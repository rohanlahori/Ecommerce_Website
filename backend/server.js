const app = require("./app");
const dotenv=require('dotenv')
const connectDb=require("./config/database")

// Handling Uncaught Exceptions

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server")

    process.exit(1)
})


dotenv.config({path:"backend/config/.env"})
// Connecting to Database
connectDb()
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