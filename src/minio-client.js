const minio = require('minio');
const {env, appSettings} = require('./config.js');


const mc = new minio.Client({
    endPoint: env.MINIO_ENDPOINT,
    port: parseInt(env.MINIO_PORT),
    useSSL: !!env.production,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
});

async function uploadObjectStream(objectName, buffer, fileType)
{
    let bucketName = '';
    let url = '';
    if(fileType === 'image') 
    {
        bucketName = appSettings.imagesBucketName;
        url = await getImageUrl(objectName);
    }
    else if(fileType === 'video') {
        bucketName = appSettings.videosBucketName;
        url = await getVideoUrl(objectName);
    }

    await mc.putObject(bucketName, objectName, buffer);

    return [url, objectName];
}

async function getImageUrl(objectName)
{
    return await mc.presignedGetObject(appSettings.imagesBucketName, objectName, 24 * 60 * 60);
}

async function getVideoUrl(objectName)
{
    return await mc.presignedGetObject(appSettings.videosBucketName, objectName, 24 * 60 * 60);
}

async function uploadObjectWithId(id, file)
{
    const [type, format] = file.mimetype.split('/');
    const objectName = `${type}-${id}.${format === 'x-matroska' ? 'mkv' : format}`;

    return await uploadObjectStream(objectName, file.buffer, type);
}

async function removeObject(objectName, type)
{
    let bucketName = '';
    if(type === 'image') bucketName = appSettings.imagesBucketName;
    else if(type === 'video') bucketName = appSettings.videosBucketName;

    await mc.removeObject(bucketName, objectName);
}

async function updateObject(prevObjectName, id, file)
{
    const [type] = file.mimetype.split('/');

    if(prevObjectName) removeObject(prevObjectName, type);

    return await uploadObjectWithId(id, file);
}

module.exports = {
    mc,
    uploadObjectStream,
    uploadObjectWithId,
    updateObject,
    getImageUrl,
    getVideoUrl,
    removeObject,
}