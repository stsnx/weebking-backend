const router = require("express").Router();
const User = require("../models/User");
const {verifyToken, verifyandauthen,verifyandAdmin, verifytoken} = require("./verifyToken");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

router.put("/addtocart/:id",verifytoken,async (req,res,next)=>{
    try{
        const usercart = await Cart.findOne(req.params.userId);
        const currentamount = await Product.findById(req.params.id);
        var cm = currentamount._doc.amount;
        var l = usercart._doc.products.length;
        console.log(cm);
        if( 1 <=cm){
            const newamount = {amount:cm-1};
            var h = true;
            for(var i=0;i<l;i++){
                if(usercart._doc.products[i].productId===id){
                    usercart._doc.products[i].quantity++;
                    h = false;
                    Product.findByIdAndUpdate(req.params.id,
                        {
                        $set:newamount,
                        },
                        {new:true}
                    );
                    break;
                }
            }
        if(h||l==0){
                console.log("p");
                var ID = req.params.id;
                var newq = {productId:`${ID}`,quantity:1};
                const updateP = await Product.findByIdAndUpdate(
                    req.params.id,
                    {
                        amount:cm-1
                    },
                    {new:true}
                    ); 
                const updatedCart = await Cart.findOneAndUpdate(
                    {userId:req.body.userId},{
                        $push:{products:newq}
                    },
                    {new:true}
                );
                console.log(updatedCart);
                
                //console.log(newp);
                //usercart.products.push(newp);
                //console.log(usercart);
                //usercart.save();
               
            }
        }
        res.status(200).json(l);
    }catch(err){
        res.status(502).json(err);
    }
    
});
module.exports = router;