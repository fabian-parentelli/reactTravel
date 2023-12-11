import { benefiteRepository } from "../repositories/index.repositories.js";

const getBenefits = async (products) => {
    const productsWithDetails = await Promise.all(products.docs.map(async (product) => {
        const benefitsDetails = await Promise.all(product.benefits.map(async (benefitId) => {
            return await benefiteRepository.getById(benefitId);
        }));
        const flattenedBenefits = benefitsDetails.flat();
        return { ...product, benefits: flattenedBenefits };
    }));
    return productsWithDetails;
};

const getBenefitsById = async (product) => {
   
    const result = await Promise.all(product.benefits.map(async (benefitId) => {
        return (await benefiteRepository.getById(benefitId));
    }));
    const benefitFlat = result.flat(); 
    return benefitFlat;
};

export { getBenefits, getBenefitsById };