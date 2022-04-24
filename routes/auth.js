const router = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const Pended = require("../models/Pended");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//register
router.post("/register",async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,process.env.PASS_SEQ)
            .toString(),
        adderss: req.body.address,
        avatar: req.body.avatar,
    });
    try{
    const savedUser = await newUser.save();
    const newCart= new Cart({
        userId : savedUser.id,
        products: [],
    });
    const newPend= new Pended({
        userId : savedUser.id,
        products: [],
    });
    try{
        await newCart.save();
        await newPend.save(); 
    }catch(err){
        res.status(500).json(err);
    }
    }catch(err){
        res.status(500).json(err);
    }
});
//login
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