const express=require("express");
const app=express();
const cors = require("cors"); 
require('dotenv').config()
const PORT=process.env.PORT || 4000;
app.use(cors({
    // origin:'http://localhost:5173',
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials:true,
    origin:["https://easy-stay1.onrender.com"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
}));
const ExpressError=require("./utils/ExpressError");
const listing=require("./Routes/Listing");
const review=require("./Routes/review");

const userRoute=require("./Routes/user");
const cookieParser=require("cookie-parser");

const dbUrl=process.env.ATLAS_DB_URL;   
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

app.listen(PORT,(()=>{
    console.log("app is listening");
}))