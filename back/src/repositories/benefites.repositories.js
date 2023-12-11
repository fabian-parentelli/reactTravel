import { benefitManager } from '../dao/manager/index.manager.js';

export default class BenefiteRepository {

    save = async (benefit) => {
        benefit.name = benefit.name.toLowerCase();
        const result = await benefitManager.save(benefit);
        return result;
    };

    getByName = async (benefit) => {
        benefit = benefit.toLowerCase();
        const result = await benefitManager.getByName(benefit);
        return result;
    };

    getAll = async () => {
        const result = await benefitManager.getAll();
        return result;
    }

    getById = async (id) => {
        const result = await benefitManager.getById(id);
        return result;
    };
};