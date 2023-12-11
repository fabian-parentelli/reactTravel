import { productRepository } from "../repositories/index.repositories.js";
import { getBenefits, getBenefitsById } from '../utils/getbenefits.js';
import { ProductNotFound } from "../utils/exceptions.utils.js";
import { getPublicIds, deleteImgs } from '../config/cloudinary.config.js';
import mongoose from "mongoose";

const save = async (products, imgName, imgUrl) => {

    const getOne = await productRepository.getByTitle(products.title);
    if (getOne) throw new ProductNotFound('Este producto ya existe');

    const { title, category, smalldescription, description, price } = products;
    if (!title || !category || !smalldescription || !description || !price) {
        throw new ProductNotFound('Datos Incompletos');
    };
    const { benefits, ...newProducts } = products;

    const array = products.benefits.split(',');
    newProducts.benefits = [];
    newProducts.benefits = array.map(prod => new mongoose.Types.ObjectId(prod));

    newProducts.img = [];
    imgName.forEach((img, index) => {
        newProducts.img.push({
            imgName: img.originalname,
            imgUrl: imgUrl[index]
        });
    });

    const result = await productRepository.save(newProducts);
    if (!result) throw new ProductNotFound('No se puede Guardar en la Base de Datos');
    return { status: 'success', products };
};

let cachedProducts = null;

const getAll = async (limit, page, query, random) => {
    if (random === '1') {
        const count = await productRepository.count();
        const startIdx = (+page - 1) * limit;
        const endIdx = startIdx + limit;
        const totalDocs = count;

        const randomProducts = await productRepository.getRandom(count);
        const paginatedProducts = randomProducts.slice(startIdx, endIdx);

        cachedProducts = randomProducts;
        const products = {
            docs: paginatedProducts,
            totalDocs,
            limit,
            totalPages: Math.ceil(totalDocs / limit),
            page: +page,
            pagingCounter: 1,
            hasPrevPage: +page > 1,
            hasNextPage: endIdx < totalDocs,
            prevPage: +page > 1 ? +page - 1 : null,
            nextPage: endIdx < totalDocs ? +page + 1 : null,
            prevLink: +page > 1 ? +page - 1 : null,
            nextLink: endIdx < totalDocs ? +page + 1 : null,
        };
        return { status: 'success', products };
    };

    if (random === '2') {
        const startIdx = (+page - 1) * limit;
        const endIdx = startIdx + limit;
        const totalDocs = cachedProducts.length;

        const paginatedProducts = cachedProducts.slice(startIdx, endIdx);
        const data = paginatedProducts;
        const products = {
            docs: data,
            totalDocs,
            limit,
            totalPages: Math.ceil(totalDocs / limit),
            page: +page,
            pagingCounter: 1,
            hasPrevPage: +page > 1,
            hasNextPage: endIdx < totalDocs,
            prevPage: +page > 1 ? +page - 1 : null,
            nextPage: endIdx < totalDocs ? +page + 1 : null,
            prevLink: +page > 1 ? +page - 1 : null,
            nextLink: endIdx < totalDocs ? +page + 1 : null,
        };
        return { status: 'success', products };
    };
    let queryObj = {};
    queryObj = query ? { category: { $regex: query, $options: "i" } } : {};

    const products = await productRepository.getAll(queryObj, +limit, +page);
    if (page > products.totalPages || page <= 0) throw new ProductNotFound('Esta página no existe');
    products.prevLink = products.hasPrevPage ? products.prevPage : null;
    products.nextLink = products.hasNextPage ? products.nextPage : null;

    products.docs = await getBenefits(products);
    return { status: 'success', products };
};

const search = async (search) => {
    const limit = 10;
    const page = 1;
    const result = await productRepository.search(search, limit, page);
    if (!result) throw new ProductNotFound('No se encuentra un producto con ese nombre');
    return result;
};

const getById = async (id) => {
    const productDb = await productRepository.getById(id);
    if (!productDb) throw new ProductNotFound('No se encuentra un producto con ese Id');

    const product = { ...productDb._doc, benefits: await getBenefitsById(productDb) };
    return { status: 'success', product };
};

const deleteById = async (id) => {
    const productDb = await productRepository.getById(id);
    if (!productDb) throw new ProductNotFound('No se encuentra un producto con ese Id');

    const urls = [];
    productDb.img.forEach((prod) => urls.push(prod.imgUrl));
    const publicId = await getPublicIds(urls);
    await deleteImgs(publicId);

    const result = await productRepository.deleteById(id);
    return { status: 'success', result };
};

const uploader = async (products, imgName, imgUrl) => {
    const getOne = await productRepository.getById(products.id);
    if (!getOne) throw new ProductNotFound('Este producto no existe');

    const { title, category, smalldescription, description, price } = products;
    if (!title || !category || !smalldescription || !description || !price) {
        throw new ProductNotFound('Datos Incompletos');
    };
    const { benefits, ...newProducts } = products;

    const array = products.benefits.split(',');
    newProducts.benefits = [];
    newProducts.benefits = array.map(prod => new mongoose.Types.ObjectId(prod));

    newProducts.img = [];
    imgName.forEach((img, index) => {
        newProducts.img.push({
            imgName: img.originalname,
            imgUrl: imgUrl[index]
        });
    });
    getOne.img.forEach((prod) => newProducts.img.push(prod));

    const result = await productRepository.uploader(newProducts.id, newProducts);
    if (!result) throw new ProductNotFound('No se puede actualizar en la Base de Datos');
    return { status: 'success', products };
};

export { save, getAll, search, getById, deleteById, uploader };