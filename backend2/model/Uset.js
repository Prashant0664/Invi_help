const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const userSchema=new Schema({
    user:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
})
module.exports=mongoose.model("User",userSchema);