const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
    userId: {type:String,required: true, unique: true},
    products: [
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            },
            status :{
                type:String,
                required:true,
            }
        },
    ],
},
    { timestamps:true }
);
module.exports = mongoose.model("Cart",CartSchema);