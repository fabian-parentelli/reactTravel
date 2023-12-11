import { favoriteManager } from '../dao/manager/index.manager.js';

export default class FavoritesRespository {

    getByUser = async (id) => {
        const result = await favoriteManager.getByUser(id);
        return result;
    };

    save = async (favorite) => {
        const result = await favoriteManager.save(favorite);
        return result;
    };

    update = async (favorite) => {
        const result = await favoriteManager.update(favorite);
        return result;
    };
};