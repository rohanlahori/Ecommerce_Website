const express= require('express')
const app=express()
app.use(express.json)

// Route imports
const product=require('./routes/productroutes')

app.get('/api/v1',product)
module.exports=app