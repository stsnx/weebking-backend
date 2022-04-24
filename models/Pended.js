const mongoose = require("mongoose");

const PendedSchema = new mongoose.Schema(
    {
    userId: {type:String,required: true},
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
                default:"pending",
                required:true,
            }
        },
    ],
},
    { timestamps:true }
);
module.exports = mongoose.model("Pended",PendedSchema);