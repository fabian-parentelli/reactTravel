import dotEnv from 'dotenv';

dotEnv.config();

export default { 
    port: process.env.PORT,
    mongoDB: process.env.MONGODB,
    privateKey: process.env.PRIVATE_KEY,
    privateKeyPassport: process.env.PRIVATEKEYPASSPORT,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
};