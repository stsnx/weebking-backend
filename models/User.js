const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
    username: {type:String,required: true, unique: true},
    email: {type:String,required: true, unique: true},
    password: {type:String,required: true, unique: true},
    isAdmin: {
        type:Boolean,
        default:false,
        },
    address: {
        type:String,require: true,
    },
    avatar:{
        type:String,
        default:"None",
    },
    },
    { timestamps:true }
);
module.exports = mongoose.model("User",UserSchema);
