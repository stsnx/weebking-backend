const router = require("express").Router();
const User = require("../models/User");
const {verifyToken, verifyandauthen,verifyandAdmin, verifytoken} = require("./verifyToken");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Pended = require("../models/Pended");
//add to cart
router.put("/addtocart/:id",verifyandauthen,async (req,res,next)=>{
   // console.log("addtocart");
    try{
     //   console.log("Pp");
     //   console.log("user = "+req.body.userId);
        const usercart = await Cart.findOne({userId:req.body.userId});
        const currentamount = await Product.findById(req.params.id);
        var cm = currentamount._doc.amount;
        var l = usercart._doc.products.length;
        var userbuy = req.body.quantity;
       // console.log(usercart);
        var h = true; 
        if( userbuy <=cm){
         //   console.log("l="+l);
            
            for(var i=0;i<l;i++){
          //      console.log("pp");
                console.log(usercart._doc);
                /*if(usercart._doc.products[i].quantity==0){
                    
                }*/
                if(usercart._doc.products[i].productId===req.params.id){
                    console.log("found"+usercart._doc.products[i].productId);
                    usercart._doc.products[i].quantity+=userbuy;
                    h = false; 
                    usercart.save();
                }
            }
            if(h||l==0){
         //       console.log("p");
                var ID = req.params.id;
                var newq = {productId:`${ID}`,quantity:userbuy};
                const updatedCart = await Cart.findOneAndUpdate(
                    {userId:req.body.userId},{
                        $push:{products:newq}
                    },
                    {new:true}
                );
            }
           
        }
        else{
            console.log("over stock");
        }
        res.status(200).json(l);
    }catch(err){
        res.status(502).json(err);
    }
});
//add to pended
router.put("/addtopended/:id",verifyandauthen,async (req,res,next)=>{
    //console.log("addtopended");
    try{
        //console.log(req.body.userId)
        const usercart = await Cart.findOne({userId:req.body.userId});
        const userpended = await Pended.findOne({userId:req.body.userId});
        const currentamount = await Product.findById(req.params.id);
        var cm = currentamount._doc.amount;
        var lp = userpended._doc.products.length;
        var lc = usercart._doc.products.length;
        var userbuy = req.body.quantity;
        var hp = true;
        var hc = true;
        
        if( userbuy <=cm){
        //    console.log("l="+lc);
            //console.log("l="+l);
            for(var i=0;i<lc;i++){
                if(usercart._doc.products[i].productId===req.params.id){
                    const checkProduct = await Product.findById(req.params.id);
                    //console.log(checkProduct._doc.cat);
                    
                    usercart._doc.products[i].quantity-=userbuy;
                    
                    hc = false;
                    if (checkProduct._doc.cat.indexOf("pre")>-1){
                        const updateP = await Product.findByIdAndUpdate(
                        req.params.id,
                        {amount:cm+userbuy},
                        {new:true}
                        ); 
                    }
                    else if(checkProduct._doc.cat.indexOf("stock")>-1){
                        const updateP = await Product.findByIdAndUpdate(
                            req.params.id,
                            {amount:cm-userbuy},
                            {new:true}
                            ); 
                    }
                    usercart.save();
                    break;
                }
            }
            if(hc||lc==0){
        //        console.log("p");
                var ID = req.params.id;
                var newq = {productId:`${ID}`,quantity:userbuy};
                const updateP = await Product.findByIdAndUpdate(
                    req.params.id,
                    {amount:cm-userbuy},
                    {new:true}
                ); 
                const updatedCart = await Cart.findOneAndUpdate(
                    {userId:req.body.userId},
                    {$push:{products:newq}},
                    {new:true}
                    );
            }
            
        //    console.log("p");
            var ID = req.params.id;
            var newq = {productId:`${ID}`,quantity:userbuy};
            const updatedPended = await Pended.findOneAndUpdate(
                {userId:req.body.userId},
                {$push:{products:newq}},
                {new:true}
                );
          //  console.log("clearzero");
            await Cart.updateOne(
                {userId:req.body.userId},{
                    $pull:{'products':{
                        quantity:0}}
                },
                {new:true}
            );
        }
        else{
            console.log("over stock");
        }
        res.status(200).json(userpended);
    }catch(err){
        res.status(502).json(err);
    }
    
});
//setstatus
router.put("/setstatus/:id",verifyandAdmin,async(req,res)=>{
    try{
        const updatedStatus = await Pended.findByIdAndUpdate(req.params.id);
        //console.log(updatedStatus._doc.products);
        for(var i=0;i<updatedStatus._doc.products.length;i++){
            console.log(updatedStatus._doc.products[i].id);
            if(updatedStatus._doc.products[i].id===req.body.pendedid){
                console.log("found");
                updatedStatus._doc.products[i].status = req.body.status;
                break;
            }
        }
    updatedStatus.save();
    res.status(200).json(updatedStatus);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;