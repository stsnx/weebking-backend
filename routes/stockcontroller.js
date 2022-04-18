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
            console.log("l="+l);
            var h = true;
            for(var i=0;i<l;i++){
                console.log("pp");
                console.log(usercart._doc);
                if(usercart._doc.products[i].productId===req.params.id){
                    console.log("pass");
                    console.log(usercart._doc.products[i].quantity);
                    usercart._doc.products[i].quantity+=1;
                    console.log(usercart._doc.products[i].quantity);
                    h = false;
                    const updateP = await Product.findByIdAndUpdate(
                        req.params.id,
                        {
                            amount:cm-1
                        },
                        {new:true}
                        ); 
                    usercart.save();
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
                //console.log(updatedCart.json);
                
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