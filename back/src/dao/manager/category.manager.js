import { categoryModel } from '../models/categorys.model.js';

export default class Category {

    save = async (category) => {
        return await categoryModel.create(category);
    };

    safindByCategorye = async (category) => {
        return await categoryModel.findOne({ name: category }).lean();
    };

    getAll = async () => {
        return await categoryModel.find().lean();
    };
};