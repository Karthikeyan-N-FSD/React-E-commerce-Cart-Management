const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Orders = mongoose.model("order", orderSchema);

module.exports = { Orders };