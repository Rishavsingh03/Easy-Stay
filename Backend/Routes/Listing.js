let Listing=require("../Models/listing");
const express=require("express");
const wrapAsync=require("../utils/wrapAsync");
const  jwt = require("jsonwebtoken");
const router=express.Router();

router.use(express.urlencoded({extended:true}));
router.use(express.json());


const ensureAuthenticated = (req, res, next) => {
    // console.log("us",req.user);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "invalid user,please login" });
    }
    jwt.verify(token, "my-secret-key", (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Invalid token" });
        }
        req.user=user;
        next();
    });
};

//index route
router.get("/",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.json(allListings);
}))

//show route
router.get("/:id", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const initialData=await Listing.findById(id).populate({path:"reviews"
        ,populate:{
            path:"author",
        },
    }).populate("owner");
    if(!initialData){
       res.status(404).json("not found");
    }
    else{
        res.json(initialData);
    }
}))

//post data
router.post("/",ensureAuthenticated, wrapAsync(async (req,res)=>{
    let {title,description,image,price,location,country}=req.body;
    let owner=req.user.id;
        const newPlace= await Listing.create({
            title,description,image,price,location,country,owner
        });
        console.log(newPlace);
        return res.status(200).json({
            status: 201,
            message: "Location added successfully",
            data: newPlace,
          });
}))
//add new listing
router.get("/new",(req, res) => {
    console.log("new");
    res.json("ss");
  });

// //get listing details
// router.get("/:id",async (req,res)=>{
//     const {id}=req.params;
//     const initialData=await Listing.findById(id).populate("reviews");
//     if(!initialData){
//        res.status(404).json("not found");
//     }
//     else{
//         res.json(initialData);
//     }
// })


//edit route
router.get("/:id/edit",async (req,res)=>{
    const {id}=req.params;
    const initialData=await Listing.findById(id).populate("reviews");
    if(!initialData){
       res.status(404).json("not found");
    }
    else{
        res.json(initialData);
    }
})
//update route

router.put("/:id",ensureAuthenticated,wrapAsync(async (req,res)=>{
    // console.log("usq",req.body);
    const {id}=req.params;
    let temp=await Listing.findById(id).populate("owner");
    // console.log("temp",temp);
    if(temp.owner.username!=req.user.username){
        res.status(500).json({success:false,message:"Invalid User"});
    }
    else{
        const { image,loc, ...rest } = req.body;
        let img=image;
        const imag={filename: "listingimage",url:`${img}`};
        const data = { location: loc,image:imag, ...rest };
        const result=await Listing.findByIdAndUpdate(id,data);
        res.json(result);
    }
    
}))

//delete route
router.delete("/:id",ensureAuthenticated,async(req,res)=>{
    console.log("reauest to  delete");
    const {id}=req.params;
    let temp=await Listing.findById(id).populate("owner");
    if(temp.owner.username!=req.user.username){
        res.status(500).json({success:false,message:"Invalid User"});
    }
    else{

        const result=await Listing.findByIdAndDelete(id);
        console.log("deleted",result);
        res.json(result);
    }
    
})

module.exports=router;