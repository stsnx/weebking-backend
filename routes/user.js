const router = require("express").Router();
const User = require("../models/User");
const {verifyToken, verifyandauthen,verifyandAdmin} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Cart = require("../models/Cart");
const Pended = require("../models/Pended");
//edit user
router.put("/:id",verifyandauthen,async(req,res)=>{
    const checkadmin = await User.findOne({'_id':req.user.id});
    if(checkadmin._doc.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
            req.body.password,process.env.PASS_SEQ)
            .toString();
        }
        try{
            
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                $set:req.body,
                },
                {new:true}
            );  
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }
    else{
        if(req.user.id === req.params.id && req.params.id===req.body.userId){
        try{
            if(!req.body.password){
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                $set:req.body,
                },
                {new:true}
            );  
            res.status(200).json(updatedUser);
            }
            else{
                res.status(403).json("forbidden action");
            }
        }catch(err){
            res.status(500).json(err);
        }
        }
        else{
            res.status(403).json("forbidden action");
        }
    }
});
//delete user
router.delete("/:id",verifyandAdmin,async (req,res)=>{
    try{
        await User.findOneAndDelete({'_id':req.params.id});
        await Cart.findOneAndDelete({'userId':req.params.id});
        await Pended.findOneAndDelete({'userId':req.params.id});
        res.status(200).json("deleted");
    } catch(err){
        res.status(500).json(err);
    }
});
//find user admin only
router.get("/find/:id",verifyandAdmin,async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});
//find all user admin only
router.get("/findall",verifyandAdmin,async (req,res)=>{
    const query = req.query.new;
    try{
        const users = query ? await User.find().sort({ _id: -1}).limit(5)
        : await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router