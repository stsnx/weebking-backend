const router = require("express").Router();
const User = require("../models/User");
const {verifyToken, verifyandauthen,verifyandAdmin, verifytoken} = require("./verifyToken");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Pended = require("../models/Pended");
//add to cart
router.put("/addtocart/:id",verifyandauthen,async (req,res)=>{
    try{
        const usercart = await Cart.findOne({userId:req.body.userId});
        const currentamount = await Product.findById(req.params.id);
        var cm = currentamount._doc.amount;
        var l = usercart._doc.products.length;
        var userbuy = req.body.quantity;
        var h = true; 
        if( userbuy <=cm){
            for(var i=0;i<l;i++){
                if(usercart._doc.products[i].productId===req.params.id){
                    if(usercart._doc.products[i].quantity+userbuy<=cm){
                        usercart._doc.products[i].quantity+=userbuy;
                        h = false; 
                        usercart.save();
                        break;
                    }
                    
                }
            }
            if(h||l==0){
                var ID = req.params.id;
                var newq = {productId:`${ID}`,quantity:userbuy};
                await Cart.findOneAndUpdate(
                    {userId:req.body.userId},{
                        $push:{products:newq}
                    },
                    {new:true}
                );
                usercart.save();
            }
           
        }
        else{
            console.log("over stock");
        }
        const usercartAf = await Cart.findOne({userId:req.body.userId});
        res.status(200).json(usercartAf);
    }catch(err){
        res.status(502).json(err);
    }
});
//add to pended product
router.put("/removefromcart/:id",verifyandauthen,async (req,res)=>{
    try{
        const usercart = await Cart.findOne({userId:req.body.userId});
        var cartamo = 0;
        for(let i of usercart.products){
            if(i.productId===req.params.id){
                cartamo = i.quantity;
                break;
            }
        }
        var lc = usercart._doc.products.length;
        var userbuy = req.body.quantity;
        if( userbuy <=cartamo){
            for(var i=0;i<lc;i++){
                if(usercart._doc.products[i].productId===req.params.id){
                    usercart._doc.products[i].quantity-=userbuy;
                    usercart.save();
                    break;
                }
            }
            
        }
        await Cart.updateOne(
                {userId:req.body.userId},{
                    $pull:{'products':{
                        quantity:0}}
                },
                {new:true}
            );
        const usercartAf = await Cart.findOne({userId:req.body.userId});
        res.status(200).json(usercartAf);
    }catch(err){
        res.status(502).json(err);
    }
});
//add to pended product
router.put("/addtopended/:id",verifyandauthen,async (req,res)=>{
    try{
        const usercart = await Cart.findOne({userId:req.body.userId});
        const userpended = await Pended.findOne({userId:req.body.userId});
        const currentamount = await Product.findById(req.params.id);
        var cm = currentamount._doc.amount;
        var ccat = currentamount._doc.cat[0];
        var cartamo = 0;
        var checkPre = false;
        for(let i of usercart.products){
            if(i.productId===req.params.id){
                cartamo = i.quantity;
                break;
            }
        }
        var lc = usercart._doc.products.length;
        var userbuy = req.body.quantity;
        var hc = true;
        if(ccat==="pre"||userbuy<=cartamo){
            checkPre =true; 
        }

       // var lp = userpended._doc.products.length;
        //var hp = true;
        
        if( userbuy <=cm&&checkPre){
            for(var i=0;i<lc;i++){
                if(usercart._doc.products[i].productId===req.params.id){
                    const checkProduct = await Product.findById(req.params.id);
                    usercart._doc.products[i].quantity-=userbuy;
                    hc = false;
                    if (checkProduct._doc.cat.indexOf("pre")>-1){
                        await Product.findByIdAndUpdate(
                        req.params.id,
                        {amount:cm+userbuy},
                        {new:true}
                        ); 
                    }
                    else if(checkProduct._doc.cat.indexOf("stock")>-1){
                        await Product.findByIdAndUpdate(
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
                var ID = req.params.id;
                var newq = {productId:`${ID}`,quantity:userbuy};
                await Product.findByIdAndUpdate(
                    req.params.id,
                    {amount:cm-userbuy},
                    {new:true}
                ); 
                await Cart.findOneAndUpdate(
                    {userId:req.body.userId},
                    {$push:{products:newq}},
                    {new:true}
                    );
            }
            var ID = req.params.id;
            var newq = {productId:`${ID}`,quantity:userbuy};
            await Pended.findOneAndUpdate(
                {userId:req.body.userId},
                {$push:{products:newq}},
                {new:true}
                );
            await Cart.updateOne(
                {userId:req.body.userId},{
                    $pull:{'products':{
                        quantity:0}}
                },
                {new:true}
            );
        }
        const userpendedAf = await Pended.findOne({userId:req.body.userId});
        res.status(200).json(userpendedAf);
    }catch(err){
        res.status(502).json(err);
    }
});
//setstatus
router.put("/setstatus/:id",verifyandAdmin,async(req,res)=>{
    
    try{
        const updatedStatus = await Pended.findByIdAndUpdate(req.params.id);
        for(let i of updatedStatus._doc.products){      
            if(i.id===req.body.pendedid){
                i.status = req.body.status;
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