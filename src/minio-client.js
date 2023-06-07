const minio = require('minio');
const {env, appSettings} = require('./config.js');


const minioClient = new minio.Client({
    endPoint: env.MINIO_ENDPOINT,
    port: parseInt(env.MINIO_PORT),
    useSSL: !!env.production,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
});


function uploadImage(fileName, fileStream, size){
    return minioClient.putObject(appSettings.imagesBucketName, fileName, fileStream, size);
}

function uploadVideo(fileName, fileStream, size){
    return minioClient.putObject(appSettings.videosBucketName, fileName, fileStream, size);
}

async function getImagePresignedUrl(objectName){
    const presignedUrl = await minioClient.presignedGetObject(appSettings.imagesBucketName, objectName, 24 * 60 * 60);
    return presignedUrl;
}

async function getVideoPresignedUrl(objectName){
    const presignedUrl = await minioClient.presignedGetObject(appSettings.videosBucketName, objectName, 24 * 60 * 60);
    return presignedUrl;
}

module.exports = {
    minioClient,
    uploadImage,
    getImagePresignedUrl,
    uploadVideo,
    getVideoPresignedUrl
}