import { v2 as cloudinary } from 'cloudinary';
import config from './dotEnv.config.js';

cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
});

const uploadToCloudinary = (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        req.cloudinaryUrls = [];
        return next();
    };

    const uploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: 'photos' }, (error, result) => {
                if (error) {
                    console.error('Error al cargar la imagen a Cloudinary:', error);
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            });

            stream.end(file.buffer);
        });
    });

    Promise.all(uploadPromises)
        .then(cloudinaryUrls => {
            req.cloudinaryUrls = cloudinaryUrls;
            next();
        })
        .catch(error => next(error));
};

const deleteImgs = async (publicIds) => {
    const deletionResults = [];

    for (const publicId of publicIds) {
        const result = await cloudinary.uploader.destroy(publicId);
        deletionResults.push(result);
    };
    return deletionResults;
};

const getPublicIds = (urls) => {
    const regex = /\/v\d+\/(.+)\.\w+/;

    const publicIds = urls.map(url => {
        const match = url.match(regex);
        if (match && match.length > 1) {
            return match[1];
        } else {
            throw new Error('URL de Cloudinary no válida');
        }
    });
    return publicIds;
};

export { uploadToCloudinary, deleteImgs, getPublicIds };