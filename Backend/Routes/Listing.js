let Listing=require("../Models/listing");
const express=require("express");
const wrapAsync=require("../utils/wrapAsync");
const  jwt = require("jsonwebtoken");
const router=express.Router();

router.use(express.urlencoded({extended:true}));
router.use(express.json());


const ensureAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "invalid user,please login" });
    }
    jwt.verify(token, "my-secret-key", (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Invalid token" });
        }
        req.user = user;
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
    const result= await Listing.findById(id);
    console.log("result of show listing");
    console.log(result);
}))

//post data
router.post("/",ensureAuthenticated, wrapAsync(async (req,res)=>{
        console.log("inside listings")
    let {title,description,image,price,location,country}=req.body;
        const newPlace= await Listing.create({
            title,description,image,price,location,country
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

router.put("/:id",wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const { image,loc, ...rest } = req.body;
    let img=image;
    const imag={filename: "listingimage",url:`${img}`};
    const data = { location: loc,image:imag, ...rest };
    const result=await Listing.findByIdAndUpdate(id,data);
    res.json(result);
}))

//delete route
router.delete("/:id",async(req,res)=>{
    console.log("reauest to  delete");
    const {id}=req.params;
    const result=await Listing.findByIdAndDelete(id);
    res.json(result);
})

module.exports=router;