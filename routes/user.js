const router = require("express").Router();
const User = require("../models/User");
const {verifyToken, verifyandauthen,verifyandAdmin} = require("./verifyToken");
router.put("/:id",verifyandauthen,async(req,res)=>{
    if(req.user.password){
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
});
router.delete("/:id",verifyandauthen,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted");
    }catch(err){
        res.status(500).json(err);
    }
});
router.get("/find/:id",verifyandAdmin,async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});
//find all
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