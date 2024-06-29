const express=require("express");
const app=express();
const cors = require("cors"); 
let Listing=require("./Models/listing");
let  Review=require("./Models/review");
app.use(cors());
const wrapAsync=require("./utils/wrapAsync");
const ExpressError=require("./utils/ExpressError");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const mongoose=require("mongoose");

main().then(()=>{
    console.log("Database Connected")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/travelGuide');
}


app.get("/",((req,res)=>{
    res.json({data:"APP is listneing"});
}))

//index route
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.json(allListings);
}))

//show route
app.get("/listings/:id", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const result= await Listing.findById(id);
    console.log(result);
}))

//post data
app.post("/listings", 
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
app.get("/listings/:id/edit",async (req,res)=>{
    const {id}=req.params;
    const initialData=await Listing.findById(id).populate("reviews");
    res.json(initialData);
})
//update route

app.put("/listings/:id",wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const { image,loc, ...rest } = req.body;
    let img=image;
    const imag={filename: "listingimage",url:`${img}`};
    const data = { location: loc,image:imag, ...rest };
    const result=await Listing.findByIdAndUpdate(id,data);
    res.json(result);
}))

//delete route
app.delete("/listings/:id",async(req,res)=>{
    console.log("reauest to  delete");
    const {id}=req.params;
    const result=await Listing.findByIdAndDelete(id);
    res.json(result);
})

//review route
app.post("/listings/:id/review",async (req,res)=>{
    const {id}=req.params;
    const {comment,rating}=req.body;
    let listing=await Listing.findById(id);
    let newreview=await Review.create({comment,rating});
    listing.reviews.push(newreview);
    listing.save();
    console.log("review added ");
    res.send("Review added Successfully");

})

//delete review

app.delete("/listings/:id/review/:rid",async (req,res)=>{
    console.log("rddd");
    let {id,rid}=req.params;
    let listing= await Listing.findByIdAndUpdate(id,{$pull:{reviews:rid}});
    let review= await Review.findByIdAndDelete(rid);
    console.log(listing);
    console.log(review);
    res.send("review deleted successfully");
})


// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the Beach",
//         price:1200,
//         location:"Goa",
//         country:"India",
//     })

//     await sampleListing.save();
//     console.log("Listing Saved");
//     res.json("Listing Saved");
// })

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not found"));

});

app.use((err,req,res,next)=>{
    console.log("inside middleware error");
    let {statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).send(message);
})

app.listen(8080,(()=>{
    console.log("app is listening");
}))