import * as benefitService from '../services/benefites.service.js';
import { BenefitNotFound } from '../utils/exceptions.utils.js';

const save = async (req, res) => {
    try {
        const result = await benefitService.save({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof BenefitNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getAll = async (req, res) => {
    try {
        const result = await benefitService.getAll();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof BenefitNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { save, getAll };