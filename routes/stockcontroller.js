const router = require("express").Router();
const User = require("../models/User");
const {verifyToken, verifyandauthen,verifyandAdmin} = require("./verifyToken");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// router.put("/addtocart/:id",verifyandauthen,async (req,res,next)=>{
//     const cart = await 
// })
module.exports = router;