import Router from './router.js';
import * as categoryController from '../controllers/categorys.controllers.js';
import { passportEnum } from '../config/enums.config.js';

export default class categoryRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportEnum.JWT, categoryController.save);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, categoryController.getAll);
    };
};