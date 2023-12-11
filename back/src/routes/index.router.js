import UsersRouter from './users.router.js';
import ProductRouter from './products.router.js';
import CategoryRouter from './category.router.js';
import BenefitRouter from './benefit.router.js';
import BookingRouter from './booking.router.js';
import FavoriteRouter from './favorites.router.js';

export const userRouter = new UsersRouter().getRouter();
export const productRouter = new ProductRouter().getRouter();
export const categoryRouter = new CategoryRouter().getRouter();
export const benefitRouter = new BenefitRouter().getRouter();
export const bookingRouter = new BookingRouter().getRouter();
export const favoriteRouter = new FavoriteRouter().getRouter();