const mongoose=require("mongoose");
const initData=require("../init/data");
const Listing=require("../Models/listing");

main().then(()=>{
    console.log("Database Connected")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/travelGuide');
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
      ...obj,owner:"669b8896acbc0c7e42a75bde"
    }));
    await Listing.insertMany(initData.data);
    console.log("Data Saved Successfully");

}

initDB();