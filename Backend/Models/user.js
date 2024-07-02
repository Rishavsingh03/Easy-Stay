const mongoose=require("mongoose");
const Schema=mongoose.Schema;
// const pasportlocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"customer"
    }
});

// userSchema.plugin(pasportlocalMongoose);

module.exports=mongoose.model("User",userSchema);