import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: false,
        default: []
    }
});

// export default mongoose.model('Product', ProductSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;