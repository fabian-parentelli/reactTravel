import { bookingManager } from '../dao/manager/index.manager.js';

export default class BookingRepository {

    save = async (booking) => {
        const result = await bookingManager.save(booking);
        return result;
    };

    getProductById = async (id) => {
        const result = await bookingManager.getProductById(id);
        return result;
    };
    
    updateById = async (booking) => {
        const result = await bookingManager.updateById(booking);
        return result;
    };

    getByDate = async (startDate, endDate) => {
        const result = await bookingManager.getByDate(startDate, endDate);
        return result;
    };

    getByUser = async (name) => {
        const result = await bookingManager.getByUser(name);
        return result;
    };
};