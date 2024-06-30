let Listing=require("../Models/listing");
const express=require("express");
const wrapAsync=require("../utils/wrapAsync");
const router=express.Router();

router.use(express.urlencoded({extended:true}));
router.use(express.json());



//index route
router.get("/",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.json(allListings);
}))

//show route
router.get("/:id", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const result= await Listing.findById(id);
    console.log(result);
}))

//post data
router.post("/", 
   wrapAsync(async (req,res)=>{
        console.log("inside listings")
    let {title,description,image,price,location,country}=req.body;
        const newPlace= await Listing.create({
            title,description,image,price,location,country
        });
        console.log(newPlace);
        return res.status(200).json({
            status: 201,
            message: "User created successfully",
            data: newPlace,
          });
}))


//edit route
router.get("/:id/edit",async (req,res)=>{
    const {id}=req.params;
    const initialData=await Listing.findById(id).populate("reviews");
    res.json(initialData);
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