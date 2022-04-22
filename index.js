const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productroute = require("./routes/product");
const userroute = require("./routes/user");
const authroute = require("./routes/auth");
const cartroute = require("./routes/cart");
const stockroute = require("./routes/stockcontroller");
const striperoute = require("./routes/stripe");
const cors = require("cors");
dotenv.config();

mongoose
 .connect(process.env.MONGO_URL)
 .then(()=> console.log("DB connected"))
 .catch((err)=>{
     console.log(err);
 });
app.use(cors());
app.use(express.json());
app.use("/api/products",productroute);
app.use("/api/users",userroute);
app.use("/api/auth",authroute);
app.use("/api/cart",cartroute);
app.use("/api/stock",stockroute);
app.use("/api/checkout",striperoute);
app.listen(process.env.PORT || 5000, ()=>{
    console.log("backend is running");
});