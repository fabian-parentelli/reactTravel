import * as favoriteService from '../services/favorites.service.js';
import { FavoriteNotFound } from '../utils/exceptions.utils.js';

const save = async (req, res) => {
    try {
        const result = await favoriteService.save({ ...req.body }, { ...req.user });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof FavoriteNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getUser = async (req, res) => {
    try {
        const result = await favoriteService.getUser({ ...req.user });
        if (result) return res.sendSuccess(result);
    } catch (error) {

        console.log(error); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Borrar <<<<<<<<<<<<<<<<<<<

        if (error instanceof FavoriteNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { save, getUser }; 