const express=require('express')
const app=express()
const product=require('./routes/productRoutes')
const middleware=require('./middleware/error')
const theFunc=require('./middleware/catchAsyncErrors')
const user=require('./routes/userRoutes')

app.use(express.json())
app.get('/', (req,res)=>{res.send("OK");})

app.use('/api/v1',product);
app.use('/api/v1/',user);


// Middleware for error
app.use(middleware,theFunc)
module.exports=app