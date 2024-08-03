const mongoose=require("mongoose")

let registerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number,required:true},
    password:{type:String,required:true},
    blocklist:{type:Array}
},{versionKey:false})

let Register=mongoose.model("Register",registerSchema)

module.exports=Register