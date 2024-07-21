let Listing=require("../Models/listing");
let  Review=require("../Models/review");

module.exports.createReview=async (req,res)=>{
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

}

module.exports.deleteReview=async (req,res)=>{
    let {id,rid}=req.params;
    let user=req.user.id;
    let temp=await Review.findById(rid);
    if(user==temp.author){
        let listing= await Listing.findByIdAndUpdate(id,{$pull:{reviews:rid}});
        let review= await Review.findByIdAndDelete(rid);
        res.status(200).json({success:true,message:"Deleted Successfully"});
    }
    else{
        res.status(500).json({success:false,message:"Not authorized"})
    }
    
}
