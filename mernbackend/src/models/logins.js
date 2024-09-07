const mongoose=require ("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const lschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        
    },
    email:{
        type:String
    },
    phone:{
        type:Number,
        required:true
    },
    dateofbirth:{
        type:Date,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
        required:true 
        }
    }]
})
  


const Login=new mongoose.model("registerdata",lschema);
module.exports=Login;