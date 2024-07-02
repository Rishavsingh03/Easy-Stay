const express=require("express");
const app=express();
const cors = require("cors"); 
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
  await mongoose.connect('mongodb://127.0.0.1:27017/travelGuide');
}

// const sessionOptions={
//     secret:"MySecret",
//     resave:false,
//     saveUninitialized:true,
//      cookie:{
//         expires:Date.now()+ 7*24*60*60*1000,
//         maxAge: 7*24*60*60*1000,
//         httpOnly:true,
//      }

// }

// app.use(session(sessionOptions));
// app.use(passport.session());
// app.use(passport.initialize());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.get("/",((req,res)=>{
    res.json({data:"APP is listneing"});
}))

app.use("/listings",listing);
app.use("/listings/:id/review",review);
app.use("/",userRoute);



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