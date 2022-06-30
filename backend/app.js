const express=require('express')
const app=express()
const product=require('./routes/productRoutes')
app.use(express.json())
app.get('/', (req,res)=>{res.send("OK");})
app.use('/api/v1',product);
module.exports=app