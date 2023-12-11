import mongoose from "mongoose";

const bookingCollection = 'bookings';

const bookingSchema = new mongoose.Schema({
    
    idProduct: { type: String, required: true },
    date: [
        {
            user: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true }
        }
    ]
});

export const bookingModel = mongoose.model(bookingCollection, bookingSchema);