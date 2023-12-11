import Router from './router.js';
import * as favoriteController from '../controllers/favorites.controllers.js';
import { passportEnum } from '../config/enums.config.js';

export default class FavoriteRouter extends Router {
    init() {
        this.post('/', ['USER', 'ADMIN'], passportEnum.JWT, favoriteController.save);
        this.get('/', ['USER', 'ADMIN'], passportEnum.JWT, favoriteController.getUser);
    };
};