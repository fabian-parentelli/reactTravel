import { categoryRepository } from "../repositories/index.repositories.js";
import { CategoryNotFound } from "../utils/exceptions.utils.js";

const save = async (category) => {
    const cat = await categoryRepository.findByCategory(category.name);
    if(cat) throw new CategoryNotFound('La categoría ya existe');

    const result = await categoryRepository.save(category);
    if (!result) throw new CategoryNotFound('No se pudo agregar a la base de datos');
    return { status: 'succes', result };
};

const getAll = async () => {
    const result = await categoryRepository.getAll();
    if (!result) throw new CategoryNotFound('No se pudo acceder a la base de datos');
    return { status: 'succes', result };
};

export { save, getAll };