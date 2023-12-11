import * as categoryService from '../services/categorys.services.js';
import { CategoryNotFound } from '../utils/exceptions.utils.js';

const save = async (req, res) => {
    try {
        const result = await categoryService.save({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CategoryNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getAll = async (req, res) => {
    try {
        const result = await categoryService.getAll();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CategoryNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { save, getAll };