
const express=require("express");
const wrapAsync=require("../utils/wrapAsync");
const router=express.Router({mergeParams :true});
const  jwt = require("jsonwebtoken");

router.use(express.urlencoded({extended:true}));
router.use(express.json());

const reviewController=require("../controllers/review");

const ensureAuthenticated = (req, res, next) => {
    console.log("us");
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "invalid user,please login" });
    }
    jwt.verify(token, "my-secret-key", (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Not Authorized" });
        }
        req.user=user;
        next();
    });
};

//review route
router.post("/",ensureAuthenticated,wrapAsync(reviewController.createReview));

//delete review
router.delete("/:rid",ensureAuthenticated,wrapAsync(reviewController.deleteReview));


module.exports=router;