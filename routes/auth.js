const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register",async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,process.env.PASS_SEQ)
            .toString(),
    });
    try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
});
router.post("/login", async(req,res)=>{
   try{
      const user = await User.findOne({username:req.body.username});
      if(!user) return res.status(401).json("Unauthorised");
      const hasedP = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEQ);
      const psswd = hasedP.toString(CryptoJS.enc.Utf8);
      if(psswd !== req.body.password) return res.status(401).json("Forbidden Authentication");
      else{ const accessToken = jwt.sign({
           id:user._id,
           isAdmin:user.isAdmin
           
       },
       process.env.JWT_SEQ,
       {expiresIn:"1d"}
       );
       const {password,...other} = user._doc;
      res.status(200).json({...other,accessToken});}
   }catch(err){
   res.status(500).json(err);
}
});
module.exports = router