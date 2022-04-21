const { verifyandauthen,verifyandAdmin, verifytoken } = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

router.post("/create",verifytoken,async (req,res)=>{
    const newCart= new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }

});

router.put("/update/:id",verifyandauthen,async (req,res)=>{
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
router.delete("/delete/:id",verifyandauthen,async (req,res)=>{
    try{
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        const title = deletedCart._doc.title
        res.status(200).json(title+" has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});
router.get("/find/:userId",verifyandauthen,async (req,res)=>{
    try{
        const foundCart = await Cart.findOne(req.params.userId);
        res.status(200).json(foundCart);
    }catch(err){
        res.status(500).json(err);
    }
});
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
