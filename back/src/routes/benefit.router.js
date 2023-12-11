import Router from './router.js';
import * as benefitController from '../controllers/benefites.controllers.js';
import { passportEnum } from '../config/enums.config.js';

export default class BenefitRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportEnum.JWT, benefitController.save);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, benefitController.getAll);
    };
};