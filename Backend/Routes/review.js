let Listing=require("../Models/listing");
let  Review=require("../Models/review");
const express=require("express");
const wrapAsync=require("../utils/wrapAsync");
const router=express.Router({mergeParams :true});
const  jwt = require("jsonwebtoken");

router.use(express.urlencoded({extended:true}));
router.use(express.json());

const ensureAuthenticated = (req, res, next) => {
    console.log("us");
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "invalid user,please login" });
    }
    jwt.verify(token, "my-secret-key", (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Not Authorized" });
        }
        req.user=user;
        next();
    });
};

//review route
router.post("/",ensureAuthenticated,async (req,res)=>{
    console.log("post");
    const {id}=req.params;
    const {comment,rating}=req.body;
    let listing=await Listing.findById(id);
    let author=req.user.id;
    // console.log(listing);
    let newreview=await Review.create({comment,rating,author});
    listing.reviews.push(newreview);
    listing.save();
    console.log("review added ");
    res.send("Review added Successfully");

})

//delete review

router.delete("/:rid",ensureAuthenticated,async (req,res)=>{
    let {id,rid}=req.params;
    let user=req.user.id;
    let temp=await Review.findById(rid);
    if(user==temp.author){
        let listing= await Listing.findByIdAndUpdate(id,{$pull:{reviews:rid}});
        let review= await Review.findByIdAndDelete(rid);
        res.send("review deleted successfully");
    }
    else{
        res.status(500).json({success:false,message:"Not authorized"})
    }
    
})


module.exports=router;