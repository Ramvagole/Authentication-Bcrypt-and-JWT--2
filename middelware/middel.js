let jwt=require("jsonwebtoken")
let dotenv=require("dotenv").config()
let Register=require("../model/regiseter.model")
function check(req,res,next){
    let b=req.headers.authorization
    jwt.verify(req.headers.authorization,process.env.SECRET_KEY,async (err,value)=>{
        if(err){
            res.status(400).send(err)
        }else{
            console.log(value)
            let c= await Register.findOne({email:value.email})
            c.blocklist.push(b)
            c.save()
            next()
        }
    })
}
module.exports=check