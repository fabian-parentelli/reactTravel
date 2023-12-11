import { favoriteModel } from '../models/favorite.model.js';

export default class Favorite {

    getByUser = async (id) => {
        return await favoriteModel.findOne({ userId: id }).lean();
    };

    save = async (favorite) => {
        return await favoriteModel.create(favorite);
    };

    update = async (favorite) => {
        return await favoriteModel.findOneAndUpdate({ _id: favorite._id }, favorite);
    };
};