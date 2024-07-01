
const express=require("express");
const { model } = require("mongoose");
const router=express.Router();
const User=require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
router.post("/signup",wrapAsync(async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
    
    }
    catch(err){
        res.status(403).json(err);
    }
        
}));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Welcome to Easy Stay' });
      });
    })(req, res, next);
  });

module.exports=router;