import mongoose from "mongoose";
const User=require('../model/User');

const signup=async(req,res)=>{
    try{
        const {user,email,password}=req.body;
        const newUser=new User({name:user,email:email,password:password});
        const savedUser=await newUser.save();
        res.status(200).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
}