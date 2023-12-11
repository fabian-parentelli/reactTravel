import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    smalldescription: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    img: [
        {
            imgName: { type: String },
            imgUrl: { type: String }
        }
    ],
    benefits: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'benefits' } 
    ]
});

productSchema.plugin(mongoosePaginate);

productSchema.pre('find', function () { this.populate('benefits.benefit') });

export const productModel = mongoose.model(productCollection, productSchema);