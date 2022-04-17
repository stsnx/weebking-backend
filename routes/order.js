const router = require("express").Router();
const Order = require("../models/Order");
const { verifyandAdmin,verifyandauthen } = require("./verifyToken");
router.post("/create",verifyandauthen,async (req,res)=>{
    const newOrder= new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }

});
router.put("/add/:id",verifyandAdmin,async (req,res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json(err);
    }

});
// router.put("/update/:id",verifyandAdmin,async (req,res)=>{
//     try{
//         const updatedOrder = await Order.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set:req.body,
//             },
//             {new:true}
//         );
//         res.status(200).json(updatedOrder);
//     }catch(err){
//         res.status(500).json(err);
//     }

// });
router.delete("/delete/:id",verifyandauthen,async (req,res)=>{
    try{
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        const title = deletedOrder._doc.title
        res.status(200).json(title+" has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});
router.get("/find/:userId",verifyandauthen,async (req,res)=>{
    try{
        const foundOrder = await Order.findOne(req.params.userId);
        res.status(200).json(foundOrder);
    }catch(err){
        res.status(500).json(err);
    }
});
router.get("/findall",verifyandAdmin,async (req,res)=>{
  const qNew = req.query.new;
  try {
    let orders;

    if (qNew) {
        orders = await Order.find().sort({ price: -1 }).limit(10);
    } else {
        orders = await Order.find();
    }
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router