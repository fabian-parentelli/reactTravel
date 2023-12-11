import { categoryManager } from '../dao/manager/index.manager.js';

export default class CategoryRepository {

    save = async (category) => {
        category.name = category.name.toLowerCase();
        const result = await categoryManager.save(category);
        return result;
    };

    findByCategory = async (category) => {
        category = category.toLowerCase();
        const result = await categoryManager.safindByCategorye(category);
        return result;
    };

    getAll = async () => {
        const result = await categoryManager.getAll();
        return result;
    };
};