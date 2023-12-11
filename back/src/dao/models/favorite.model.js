import mongoose from "mongoose";

const favoriteCollection = 'favorites';

const favoriteSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: []
});

export const favoriteModel = mongoose.model(favoriteCollection, favoriteSchema);