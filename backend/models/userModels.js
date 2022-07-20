const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const { reset } = require('nodemon')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Your Name'],
        maxlength:[30,'Name can maximum 30 character'],
        minlength:[4,'Name should have atleast 4 characters']
    },
    email:{
        type:String,
        required:[true,'Please Enter Your Email'],
        unique:true,
        validator:[validator.isEmail,"Please Enter a valid Email Address"],
        // automatically validates the email address 
    },
    password:{
        type:String,
        required:[true,'Please Enter Password'],
        minlength:[8,'Password should have atleast 8 character'],
        select:false
    },
    avatar:
    {
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user",

    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})


userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

// JWT Token
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

// Compare Password Method
userSchema.methods.comparePassword=async function(enteredPassword){
    console.log(this.password);
    console.log(enteredPassword)
    return await bcrypt.compare(enteredPassword,this.password);
}

// Generating reset Password Token 
userSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString("hex");

    // Hashing and adding reset Password Token to userSchema
    this.resetPasswordToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    this.resetPasswordExpire=Date.now()+(15*60*1000);
    return resetToken;
}
module.exports=mongoose.model("User",userSchema) 