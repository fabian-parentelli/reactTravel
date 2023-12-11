import { bookingModel } from '../models/bookings.model.js';

export default class Booking {

    save = async (booking) => {
        return await bookingModel.create(booking);
    };

    getProductById = async (id) => {
        return await bookingModel.findOne({ idProduct: id });
    };

    updateById = async (booking) => {
        return await bookingModel.findByIdAndUpdate({ _id: booking._id }, booking);
    };

    getByDate = async (startDate, endDate) => {
        return await bookingModel.find({
            'date': {
                $elemMatch: {
                    $or: [
                        { startDate: { $gte: startDate.toDate(), $lte: endDate.toDate() } },
                        { endDate: { $gte: startDate.toDate(), $lte: endDate.toDate() } },
                        { startDate: { $lte: startDate.toDate() }, endDate: { $gte: endDate.toDate() } },
                    ],
                },
            },
        });
    };

    getByUser = async (name) => {
        return await bookingModel.find({ 'date': { $elemMatch: { 'user': name } } }).lean();
    };
};