const dotenv=require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const Register=require("./model/regiseter.model")
const Login=require("./model/login.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const check=require("./middelware/middel.js")
const app=express()

app.use(express.json())

app.post("/register",async(req,res)=>{
    let {name,email,age,password}=req.body
    
    try{
        bcrypt.hash(password,5,async(err,value)=>{
            if(err){
                res.status(401).send(err)
            }
            try{
                let reg=new Register({name,email,age,password:value})
                await reg.save()
                res.status(200).send("succesfully registerd")
            }catch(err){
                res.status(400).send(`${err} ,error in register`)
            }
        })
        
    }catch(err){
        res.status(400).send(`${err} ,error in register`)
    }
})

app.post("/login",async(req,res)=>{
    let {email,password}=req.body
    try{
        let user=await Register.findOne({email:email})
        
        console.log(user.email)
        bcrypt.compare(password,user.password,(err,result)=>{
            if(err){
                res.status(401).send(err)
            }else if(result){
                let a=jwt.sign({email:user.email},process.env.SECRET_KEY,{expiresIn:"5min"})
                
                res.status(200).json({a})
            }else{
                res.status(400).send(err)
            }
        })
    }catch(err){
        res.status(400).send(err)
    }
})

app.get("/logout",check,(req,res)=>{
    
    res.send("logout successfully")
})

app.listen(process.env.PORT,async()=>{
    try{
        await mongoose.connect(process.env.URL)
        console.log(`Hosted on port ${process.env.PORT} and conected to db`)
    }catch(err){
        console.log(err)
    }
})