const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        ProductName: {
            type: String,
            required: true,
        },
        ProductPrice: {
            type: Number,
            required: true,
        },
        ProductBarcode: {
            type: Number,
            required: true,
        },
        ProductQuantity: {
            type: Number,
            required: true,
            default: 0,
        },
        ProductCategory: {
            type: String,
            required: true,
        },
        ProductDescription: {
            type: String,
            default: '',
        },
        LowStockThreshold: {
            type: Number,
            default: 10,
        },
    }, {
        timestamps: true
    });

const Products = mongoose.model("Products", ProductSchema)
module.exports = Products;
