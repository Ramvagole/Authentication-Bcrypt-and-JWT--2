const mongoose=require("mongoose")

let loginSchema=new mongoose.Schema({},{versionKey:false})

let Login=mongoose.model("Login",loginSchema)

module.exports=Login