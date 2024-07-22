let Listing=require("../Models/listing");


module.exports.index=async (req,res)=>{
    const allListings = await Listing.find({});
    res.json(allListings);
}

module.exports.showroute=async(req,res)=>{
    console.log("lsitings:");
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
}

module.exports.postData=async (req,res)=>{
    let {title,description,image,price,location,country}=req.body;
    let owner=req.user.id;
    let url=req.file.path;
    let filename=req.file.filename;
    image={url,filename};
    const newPlace= await Listing.create({
            title,description,image,price,location,country,owner
        });
        console.log(newPlace);
        return res.status(200).json({
            status: 201,
            message: "Location added successfully",
            data: newPlace,
    });
}

module.exports.editRoute=async (req,res)=>{
    const {id}=req.params;
    const initialData=await Listing.findById(id).populate("reviews").populate("owner");
    if(!initialData){
       res.status(404).json("not found");
    }
    else{
        if(req.user.id==initialData.owner._id){
            res.json(initialData);
        }
        else{
            res.status(402).json({success:false,message:"Invalid User"});
        }
       
    }
}


module.exports.updateRoute=async (req,res)=>{
    // console.log("usq",req.body);
    const {id}=req.params;
    let temp=await Listing.findById(id).populate("owner");
    // console.log("temp",temp);
    if(temp.owner.username!=req.user.username){
        res.status(500).json({success:false,message:"Invalid User"});
    }
    else{
        let data=req.body;
        const result=await Listing.findByIdAndUpdate(id,data);
        if(typeof(req.file)!="undefined"){
            let url=req.file.path;
            let filename=req.file.filename;
            result.image={url,filename};
            await result.save();
        }
        else{
            let url=temp.image.url;
            let filename=temp.image.filename;
            result.image={url,filename};
            await result.save();
        }
        res.json(result);
    }
    
}

module.exports.deleteRoute=async(req,res)=>{
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
    
}