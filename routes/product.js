const Product = require("../models/Product");
const User = require("../models/User");
const { verifyandAdmin, verifyandauthen, verifytoken } = require("./verifyToken");

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
        const title = deletedProduct._doc.title;
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
  const qNew = req.query.new;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ price: -1 }).limit(10);
    } else {
      products = await Product.find();
    }
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});
//filter
//cat
router.get("/filterps/:seq",verifytoken,async (req,res)=>{
    try{
        const foundProduct = await Product.find({cat:req.params.seq});
        res.status(200).json(foundProduct);
    }catch(err){
        res.status(500).json(err);
    }
});
//price
router.get("/filterpr/:seq",verifytoken,async (req,res)=>{
    //1000-2000
    var rangepr = req.params.seq.split('-');
    rangepr[0] = parseInt(rangepr[0]);
    rangepr[1] = parseInt(rangepr[1]);
    try{
        console.log(rangepr[0]);
        const foundProduct = await Product.find({'price':{'$gte':rangepr[0],'$lte':rangepr[1]}});
        res.status(200).json(foundProduct);
    }catch(err){
        res.status(500).json(err);
    }
});
//multicat
router.post("/filtermps",verifytoken,async (req,res)=>{
    try{
        const multifilter = req.body.fdict;
        var filtered = await Product.find({cat:{$all:multifilter}});
        res.status(200).json(filtered);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router