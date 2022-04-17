const jwt = require("jsonwebtoken");

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
        return res.status(401).json("error 401");
    }
}

const verifyandauthen = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.id === req.params.id||req.user.isAdmin){
        next();
        }
        else{
            res.status(403).json("unauthen");
        }
    });
};

const verifyandAdmin = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
        next();
        }
        else{
            res.status(403).json("unauthen");
        }
    });
};
module.exports = {verifytoken,verifyandauthen,verifyandAdmin};