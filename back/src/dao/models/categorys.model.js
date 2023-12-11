import mongoose from "mongoose";

const categoryCollection = 'categorys';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
});

export const categoryModel = mongoose.model(categoryCollection, categorySchema);