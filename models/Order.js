const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
    title: {type:String,required: true},
    desc: {type:String,required: true},
    img: {type:String,required: true},
    cat: {type:Array},
    price: {type:Number,required: true},
    amount: {type:Number,required: true},
},
    { timestamps:true }
);
module.exports = mongoose.model("Order",CartSchema);