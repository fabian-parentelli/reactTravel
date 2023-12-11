import { userModel } from '../models/users.model.js';

export default class User {

    register = async (user) => {
        return await userModel.create(user);
    };

    getByEmail = async (email) => {
        return await userModel.findOne({ email }).lean();
    };

    updateUser = async (id, user) => {
        return await userModel.findOneAndUpdate({ _id: id }, user, { new: true }).lean();
    };

    getAll = async () => {
        return await userModel.find().lean();
    };

    getById = async (uId) => {
        return await userModel.findById(uId);
    };

    userRole = async (id, role) => {
        return await userModel.findOneAndUpdate({_id: id}, { role: role }, { new: true });
    };
};