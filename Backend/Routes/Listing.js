
const express=require("express");
const wrapAsync=require("../utils/wrapAsync");
const  jwt = require("jsonwebtoken");
const router=express.Router();
router.use(express.urlencoded({extended:true}));
router.use(express.json());
const multer  = require('multer');
const { storage }=require("../cloudConfig");
const upload = multer({ storage });
const listingController=require("../controllers/listing");
const ensureAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "invalid user,please login" });
    }
    jwt.verify(token, "my-secret-key", (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Invalid token" });
        }
        req.user=user;
        next();
    });
};

//index route
router.get("/",wrapAsync(listingController.index));

//show route
router.get("/:id", wrapAsync(listingController.showroute));

//post data
router.post("/",ensureAuthenticated,upload.single('image'), wrapAsync(listingController.postData));
//edit route 
router.get("/:id/edit",ensureAuthenticated,listingController.editRoute);
//update route

router.put("/:id",ensureAuthenticated,upload.single('image'),wrapAsync(listingController.updateRoute));

//delete route
router.delete("/:id",ensureAuthenticated,listingController.deleteRoute);

module.exports=router;