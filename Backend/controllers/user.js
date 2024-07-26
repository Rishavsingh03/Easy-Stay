const User=require("../Models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require('dotenv').config();
module.exports.signup=async (req,res)=>{
    try{
        let {username,email,password,role}=req.body;
        let user=await User.findOne({username:username});
        if(user){
            res.status(500).json({success:false,message:"Username already exists"});
        }
        else{
            bcrypt.hash(password,10)
            .then(hash=>{
                User.create({username,email,password:hash,role})
                .then(user=>{
                        const token=jwt.sign({id:user._id, username:user.username, role:user.role},
                        process.env.JWT_SECRET_TOKEN,{expiresIn: 60*60*1000 })

                            //    res.cookie('token',token,{
                            //         httpOnly: true,
                            //         secure:process.env.NODE_ENV === 'production',
                            //         expires:new Date(Date.now()+60*60*1000),
                            //         sameSite: 'None'
                            //     })  
                    res.json({success:true,message:"Signed IN",token});
                }).catch(err=>{
                    res.json(err);
                })  
            }).catch(err=>{
                res.json({success:false,message:"Unable to store password"});
            })
        }  
    }
    catch(err){
        res.status(403).json(err);
    }
        
}

module.exports.login=(req,res)=>{
    const {username,password} =req.body;
    User.findOne({username:username})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    const token=jwt.sign({id:user._id, username:user.username, role:user.role},
                        process.env.JWT_SECRET_TOKEN,{expiresIn: 60*60*1000 })

                            //    res.cookie('token',token,{
                            //         httpOnly: true,
                            //         secure:process.env.NODE_ENV === 'production',
                            //         expires:new Date(Date.now()+60*60*1000),
                            //         sameSite: 'None'
                            //     })  
                     res.json({success:true,message:"Logged IN",token});
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

}
module.exports.logout=(req, res) => {
    res.clearCookie('token', { httpOnly: true, secure:process.env.NODE_ENV === 'production', sameSite: 'None' });
    res.json({ success: true, message: "Logged out successfully" });
}