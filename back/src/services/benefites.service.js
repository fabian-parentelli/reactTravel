import { benefiteRepository } from "../repositories/index.repositories.js";
import { BenefitNotFound} from "../utils/exceptions.utils.js";

const save = async (benefit) => {
    const ben = await benefiteRepository.getByName(benefit.name);
    if (ben) throw new BenefitNotFound('La prestación ya existe');

    const result = await benefiteRepository.save(benefit);
    if (!result) throw new BenefitNotFound('No se pudo agregar la prestación a la base de datos');
    return { status: 'succes', result };
};

const getAll = async () => {
    const result = await benefiteRepository.getAll();
    if(!result) throw new BenefitNotFound('No se pueden encontrar las prestaciones');
    return { status: 'result', result };
};

export { save, getAll };