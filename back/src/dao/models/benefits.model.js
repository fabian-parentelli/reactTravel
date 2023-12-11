import mongoose from "mongoose";

const benefitCollection = 'benefits';

const benefitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    text: { type: String, required: true },
    icon: { type: String, required: true }
});

export const benefitModel = mongoose.model(benefitCollection, benefitSchema);