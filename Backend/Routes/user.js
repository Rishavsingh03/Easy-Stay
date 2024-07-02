
const express=require("express");
const { model } = require("mongoose");
const router=express.Router();
const User=require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");



router.post("/signup",wrapAsync(async (req,res)=>{
    try{
        let {username,email,password,role}=req.body;
        let user=await User.findOne({username:username});
        if(user){
            res.status(500).json({success:false,message:"Username already exists"});
        }
        else{
            console.log(req.body);
            bcrypt.hash(password,10)
            .then(hash=>{
                User.create({username,email,password:hash,role})
                .then(user=>{
                    return res.json({status:"Success"})
                }).catch(err=>{
                    res.json(err);
                })
            }).catch(err=>{
                res.json({success:false,message:"Unable to stoore password"});
            })
        }  
    }
    catch(err){
        res.status(403).json(err);
    }
        
}));

router.post('/login',(req,res)=>{
    const {username,password} =req.body;
    User.findOne({username:username})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    const token=jwt.sign({username:user.username,role:user.role},
                        "my-secret-key",{expiresIn: "1d" })
                        res.cookie('token',token,{
                                    httpOnly: true,
                                    secure: false,})  
                     res.json({success:true,message:"Logged IN"});
                }
                else{
                    res.status(500).json({success:false,message:"Invalid Username or Password"});
                }
            })
        }
        else{
            res.status(500).json({success:false,message:"User does not exists"});
        } 
    })

  });

module.exports=router;