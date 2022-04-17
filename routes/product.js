const Product = require("../models/Product");
const User = require("../models/User");
const { verifyandAdmin } = require("./verifyToken");

const router = require("express").Router();

router.post("/add",verifyandAdmin,async (req,res)=>{
    const newProduct = new Product(req.body);
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }

});

router.put("/update/:id",verifyandAdmin,async (req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err);
    }

});
router.delete("/delete/:id",verifyandAdmin,async (req,res)=>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        const title = deletedProduct._doc.title
        res.status(200).json(title+" has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});
router.get("/find/:id",verifyandAdmin,async (req,res)=>{
    try{
        const foundProduct = await Product.findById(req.params.id);
        res.status(200).json(foundProduct);
    }catch(err){
        res.status(500).json(err);
    }
});
router.get("/findall",verifyandAdmin,async (req,res)=>{
    const query = req.query.new;
    try{
        const products = query ? await Product.find().sort({ _id: -1}).limit(5)
        : await Product.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router