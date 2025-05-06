import AWS from 'aws-sdk';

// Definición de las credenciales de S3
const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.REGION_NAME
});

/**
 * Subir una imagen a S3.
 * @param {string} usuario - El nombre del usuario.
 * @param {string} foto - La foto en base64.
 * @param {string} nombreArchivo - El nombre del archivo.
 * @returns {Promise<string>} - URL de la imagen subida.
 */
export const uploadImageToS3 = async (foto, nombreArchivo) => {
    const buff = Buffer.from(foto, 'base64');
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `perfil/${nombreArchivo}.jpg`,
        Body: buff,
        ContentType: 'image/jpeg'
    };

    try {
        await s3.putObject(params).promise();
        console.log("Se ha subido la imagen a S3");
        return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/perfil/${nombreArchivo}.jpg`;
    } catch (error) {
        console.error("Error al subir la imagen a S3:", error);
        throw new Error('Error al subir la imagen a S3');
    }
};
