const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:String,
    price: Number,
    category:String,
    userId:String,
    company:String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}); 

module.exports = mongoose.model("products", productSchema);