import { productManager } from '../dao/manager/index.manager.js';

export default class ProductRepository {

    save = async (product) => {
        product.title = product.title.toLowerCase();
        const result = await productManager.save(product);
        return result;
    };

    getAll = async (query, limit, page) => {
        const result = await productManager.getAll(query, limit, page);
        return result;
    };
    
    getRandom = async (limit) => {
        const result = await productManager.getRandom(limit);
        return result;
    };

    count = async () => {
        const result = await productManager.count();
        return result;
    };

    getByTitle = async (title) => {
        const result = await productManager.getByTitle(title);
        return result;
    };

    search = async (search, limit, page) => {
        const result = await productManager.search(search, limit, page);
        return result;
    };

    getById = async (id) => {
        const result = await productManager.getById(id);
        return result;
    };

    deleteById = async (id) => {
        const result = await productManager.deleteById(id);
        return result;
    };

    uploader = async (id, product) => {
        const result = await productManager.uploader(id, product);
        return result;
    };

    getOthers = async (id) => {
        const result = await productManager.getOthers(id);
        return result;
    };
};