const jwt = require("jsonwebtoken");
//verify token
const verifytoken = (req,res,next) =>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEQ,(err,user)=>{
            if(err) res.status(403).json("wrong token");
            req.user = user;
            next();
        });
    }
    else{
        return res.status(401).json("unauthorizetion");
    }
}
//check user and JWT
const verifyandauthen = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.id === req.body.userId||req.user.isAdmin){
        next();
        }
        else{
            res.status(403).json("forbidden access");
        }
    });
};
//verify admin
const verifyandAdmin = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
        next();
        }
        else{
            res.status(403).json("forbidden access");
        }
    });
};
module.exports = {verifytoken,verifyandauthen,verifyandAdmin};