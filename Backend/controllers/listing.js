let Listing=require("../Models/listing");


module.exports.index=async (req,res)=>{
    const allListings = await Listing.find({});
    res.json(allListings);
}

module.exports.showroute=async(req,res)=>{
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
    const initialData=await Listing.findById(id).populate("reviews");
    if(!initialData){
       res.status(404).json("not found");
    }
    else{
        res.json(initialData);
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
        const { image,loc, ...rest } = req.body;
        let img=image;
        const imag={filename: "listingimage",url:`${img}`};
        const data = { location: loc,image:imag, ...rest };
        const result=await Listing.findByIdAndUpdate(id,data);
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