import { userRepository } from "../repositories/index.repositories.js";
import { createHash, isValidPassword } from '../utils/hasPassword.utils.js';
import { UserNotFound } from "../utils/exceptions.utils.js";
import { generateToken } from '../utils/jwt.utils.js';

const register = async (user) => {
    const { name, lastName, email, password } = user;
    if (!name || !lastName || !email || !password) throw new UserNotFound('Los datos están incompletos');

    const exists = await userRepository.getByEmail(email);
    if (exists) throw new UserNotFound('El usuario ya existe');

    const hashedPassword = createHash(password);
    user.password = hashedPassword;

    const result = await userRepository.register(user);
    if (!result) throw new UserNotFound('El usuario no se pugo guardar con éxito');

    delete user.password;
    return { status: 'success', payload: user };
};

const login = async (user) => {
    const userDB = await userRepository.getByEmail(user.email);
    if (!userDB) throw new UserNotFound('El email no coincide con algun usuario existente');

    const comparePassword = isValidPassword(userDB, user.password);
    if (!comparePassword) throw new UserNotFound('La contraseña es incorrecta');

    delete userDB.password;
    const accesToken = generateToken(userDB);
    return { status: 'success', accesToken };
};

const getByEmail = async (email) => {
    const user = await userRepository.getByEmail(email);
    delete user.password;
    return user;
};

const updateUser = async (userId, user) => {
    const { name, lastName, email } = user;
    if (!name || !lastName || !email) throw new UserNotFound('Los datos están incompletos');

    const result = await userRepository.updateUser(userId, user);
    if (!result) throw new UserNotFound('No se pudo modificar el usuario');
    delete result.password;
    return { status: 'success', payload: result };
};

const userRole = async (uId, user) => {
    const resultDb = await userRepository.getById(uId);
    if (!resultDb) throw new UserNotFound('No se encuentra al usuario seleccionado');
    if(user.name === resultDb.name) throw new UserNotFound('No se puede eliminar a usted mismo');

    const newRole = resultDb.role === 'user' ? 'admin' : 'user';
    const role = await userRepository.userRole(resultDb._id, newRole);
    if(!role) throw new UserNotFound('No se puede modificar el rol del usuario');
    return { status: 'success', role };
};

const getAll = async () => {
    const result = await userRepository.getAll();
    if (!result) throw new UserNotFound('No se puede acceder a la base de datos de Usuarios');
    return { status: 'success', result };
};

export { register, login, getByEmail, updateUser, userRole, getAll };