
const express=require("express");
const { model } = require("mongoose");
const router=express.Router();
const User=require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userController=require("../controllers/user");


router.post("/signup",wrapAsync(userController.signup));

router.post('/login',userController.login);

router.post('/logout', userController.logout);

router.get('/checkAuth', (req, res) => {
    console.log("inside auth");
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    jwt.verify(token, "my-secret-key", (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Invalid token" });
        }
        res.json({ success: true, user });
        console.log("user",user);
    });
});

module.exports=router;