const express=require("express");
const app=express();
const bcrypt=require("bcrypt")
const path=require("path");
const hbs=require("hbs");
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");
app.use(express.static(static_path));
require("./db/conn");
const Login=require("./models/logins");
const e = require("express");
app.set("view engine","hbs");
app.set("views",template_path);
app.use(express.urlencoded({extended:false}));
hbs.registerPartials(partial_path);

app.use(express.json());
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/register",(req,res)=>{
    res.render("registration");
})
app.post("/login",async(req,res)=>{
    try {
const name=req.body.username;
const password=req.body.password;
const username1= await Login.findOne({name:name});
const isMatch= await bcrypt.compare(password,username1.password);
if(isMatch)
res.render("index");
else
res.send("invalid input");
    
    
    } catch (error) {
        res.status(400).send("invalid login");
    }
})
app.post("/register",async(req,res)=>{
    try {
const ayus=new Login({
    name:req.body.name,
    password:req.body.password,
    gender:req.body.gender,
    email:req.body.email,
    phone:req.body.phonenumber,
    dateofbirth:req.body.dob,
    language:req.body.language,
    address:req.body.address
    })
    const token=await ayus.generateAuthToken();

    const ayus1= await ayus.save()
    res.render("index");
    } catch (error) {
        res.status(400).send(error);
    }
})
app.listen(8000 , ()=>{
    console.log(`server is running at 5500`);
})