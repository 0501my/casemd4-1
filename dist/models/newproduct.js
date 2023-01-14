"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        require: true
    },
    imagePath: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    created: {
        type: String,
        default: Date.now
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    }
});
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
//# sourceMappingURL=newproduct.js.map