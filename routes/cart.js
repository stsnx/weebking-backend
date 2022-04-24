const { verifyandauthen,verifyandAdmin, verifytoken } = require("./verifyToken");
const Cart = require("../models/Cart");
const User = require("../models/User");
const router = require("express").Router();
//create cart
router.post("/create",verifyandAdmin,async (req,res)=>{
    const newCart= new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }

});
//edit cart
router.put("/update/:id",verifyandAdmin,async (req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }

});
//delete cart
router.delete("/delete/:id",verifyandAdmin,async (req,res)=>{
    try{
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        const title = deletedCart._doc.title
        res.status(200).json(title+" has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

//findcart
router.post("/find/:userId",verifyandauthen,async (req,res)=>{
    
    try{
        let ownercart = await User.findById(req.params.userId);
        if(req.body.userId === ownercart.id&&req.body.userId ===req.params.userId){
        const foundCart = await Cart.findOne({"userId":req.params.userId});
        res.status(200).json(foundCart);
        }
        else{
            res.status(403).json("forbidden action");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//find all cart admin only
router.get("/findall",verifyandAdmin,async (req,res)=>{
  const qNew = req.query.new;
  try {
    let carts;

    if (qNew) {
        carts = await Cart.find().sort({ price: -1 }).limit(10);
    } else {
        carts = await Cart.find();
    }
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router
