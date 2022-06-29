const app =require('app')
const dotenv=require('dotenv')

dotenv.config({path:"backend/config/.env"})

app.listen(process.env.Port,()=>{
    console.log(`Server is running on ${process.env.Port}`)
})