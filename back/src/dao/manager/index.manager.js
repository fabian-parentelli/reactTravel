import User from './users.manager.js';
import Product from './products.manager.js';
import Category from './category.manager.js';
import Benefit from './benefits.manager.js';
import Booking from './bookings.manager.js';
import Favorite from './favorite.manager.js';

export const userManager = new User();
export const productManager = new Product();
export const categoryManager = new Category();
export const benefitManager = new Benefit();
export const bookingManager = new Booking();
export const favoriteManager = new Favorite();