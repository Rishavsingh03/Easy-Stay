const express=require("express");
const app=express();
const cors = require("cors"); 
require('dotenv').config()
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
}));
const ExpressError=require("./utils/ExpressError");
const listing=require("./Routes/Listing");
const review=require("./Routes/review");

const userRoute=require("./Routes/user");
const cookieParser=require("cookie-parser");

const dbUrl=process.env.ATLAS_DB_URL;   
// const session =require("express-session")

// const passport=require("passport");
// const LocalStrategy=require("passport-local");
const User=require("./Models/user");
app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const mongoose=require("mongoose");

main().then(()=>{
    console.log("Database Connected")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.get("/",((req,res)=>{
    res.json({data:"APP is listneing"});
}))

app.use("/listings",listing);
app.use("/listings/:id/review",review);
app.use("/",userRoute);

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