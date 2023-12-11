import mongoose from "mongoose";
import env from '../config/dotEnv.config.js';

export default function mongoDB() {
    try {
        console.log('Mongo conected');
        mongoose.connect(env.mongoDB);
    } catch (error) {
        console.log(error);
    };
};