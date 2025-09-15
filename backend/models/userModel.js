const mongoose=require('mongoose')
const userModel=new mongoose.Schema({
    username:String,
    password:String,
    email:String  
})
module.exports=mongoose.model('userdetails',userModel)