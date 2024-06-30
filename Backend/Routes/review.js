let Listing=require("../Models/listing");
let  Review=require("../Models/review");
const express=require("express");
const wrapAsync=require("../utils/wrapAsync");
const router=express.Router({mergeParams :true});

router.use(express.urlencoded({extended:true}));
router.use(express.json());


//review route
router.post("/",async (req,res)=>{
    const {id}=req.params;
    const {comment,rating}=req.body;
    let listing=await Listing.findById(id);
    console.log(listing);
    let newreview=await Review.create({comment,rating});
    listing.reviews.push(newreview);
    listing.save();
    console.log("review added ");
    res.send("Review added Successfully");

})

//delete review

router.delete("/:rid",async (req,res)=>{
    console.log("rddd");
    let {id,rid}=req.params;
    let listing= await Listing.findByIdAndUpdate(id,{$pull:{reviews:rid}});
    let review= await Review.findByIdAndDelete(rid);
    console.log(listing);
    console.log(review);
    res.send("review deleted successfully");
})


module.exports=router;