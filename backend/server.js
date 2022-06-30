const app = require("./app");
const dotenv=require('dotenv')
const connectDb=require("./config/database")

dotenv.config({path:"backend/config/.env"})


// Connecting to Database
connectDb()
app.listen(process.env.PORT,()=>{
    console.log(`Server is working on ${process.env.PORT}`)
})