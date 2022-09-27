const express=require('express')
const app=express()
const product=require('./routes/productRoutes')
const middleware=require('./middleware/error')
const theFunc=require('./middleware/catchAsyncErrors')
const user=require('./routes/userRoutes')
const cookieParser=require('cookie-parser')
const order=require('./routes/orderRoutes')
const bodyParser=require("body-parser")
const fileUpload=require("express-fileupload")

app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(express.json())
app.get('/', (req,res)=>{res.send("OK");})

app.use(cookieParser()); 
app.use('/api/v1',product);
app.use('/api/v1/',user);
app.use('/api/v1/',order);



// Middleware for error
app.use(middleware,theFunc)
module.exports=app