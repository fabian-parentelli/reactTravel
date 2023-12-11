import { benefitModel } from '../models/benefits.model.js';

export default class Benefit {

    save = async (benefit) => {
        return await benefitModel.create(benefit);
    };

    getByName = async (benefit) => {
        return await benefitModel.findOne({ name: benefit }).lean();
    };

    getAll = async () => {
        return await benefitModel.find().lean();
    };

    getById = async (id) => {
        return await benefitModel.find({_id: id}).lean();
    };
};