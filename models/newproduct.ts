import {Schema,model} from "mongoose";

const ProductSchema = new Schema({
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
    price:
    {
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true,
    },

    quantity:{
        type: Number,
        require: true,
    },

    created:{
        type: String,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',

    }
   
})

export const ProductModel= model('Product',ProductSchema);





