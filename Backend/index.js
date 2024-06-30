const express=require("express");
const app=express();
const cors = require("cors"); 
app.use(cors());
const ExpressError=require("./utils/ExpressError");
const listing=require("./Routes/Listing");

const review=require("./Routes/review");

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

app.use("/listings",listing);
app.use("/listings/:id/review",review)



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