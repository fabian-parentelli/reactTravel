import jwt from 'jsonwebtoken';
import env from '../config/dotEnv.config.js';

const generateToken = (user) => {
    const token = jwt.sign({ user }, env.privateKey, { expiresIn: '24h' });
    return token;
};

export { generateToken };