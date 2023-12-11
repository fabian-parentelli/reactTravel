import { productModel } from '../models/products.model.js';

export default class Product {

    save = async (product) => {
        return await productModel.create(product);
    };

    getAll = async (query, limit, page) => {
        return await productModel.paginate(query, { limit, page, lean: true, populate: 'benefits.benefit' });
    };

    getRandom = async (limit) => {
        return await productModel.aggregate([
            { $sample: { size: limit } },
        ]);
    };

    count = async () => {
        return await productModel.countDocuments();
    };

    getByTitle = async (title) => {
        return await productModel.findOne({ title: title });
    };

    search = async (search, limit, page) => {
        const query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ],
        };
        return await productModel.paginate(query, { limit, page, lean: true, populate: 'benefits.benefit' });
    };

    getById = async (id) => {
        return await productModel.findById(id);
    };

    deleteById = async (id) => {
        return await productModel.findByIdAndDelete({ _id: id });
    };

    uploader = async (id, product) => {
        return await productModel.findByIdAndUpdate({ _id: id }, product, { new: true }).lean();
    };

    getOthers = async (id) => {
        return await productModel.find({ _id: { $nin: id } });
    };
};