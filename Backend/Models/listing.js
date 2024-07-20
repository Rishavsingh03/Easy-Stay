const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review");
const listingSchema=new Schema({
    title:{
        type:String,
        required : true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        filename:{
            type:String,
            default: "newPlace"
        },
        url:{
        type:String,
        default:
            "https://images.unsplash.com/photo-1718027808460-7069cf0ca9ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
        set : (v)=>
            v===""?"https://images.unsplash.com/photo-1718027808460-7069cf0ca9ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
            :v
        }
    },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;