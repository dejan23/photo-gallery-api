/* eslint-disable object-curly-newline */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { aws } from '../config/index.js';
import processFileMiddleware from '../utils/multer.util.js';
import ImagesModel from '../models/images.model.js';

const { AWSAccessKeyId, AWSSecretKey, AWSBucketName } = aws;

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey,
  },
  region: 'eu-central-1',
});

const imagesUpload = async (req, res, next) => {
  try {
    await processFileMiddleware(req, res);

    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }

    const { originalname, buffer, size, mimetype } = req.file;
    const fileName = originalname.replace(/ /g, '-');

    const obj = {
      key: fileName,
      buffer,
      size,
      src: `https://${AWSBucketName}.s3.amazonaws.com/${fileName}`,
      bucket: AWSBucketName,
    };

    const uploadParams = {
      Bucket: AWSBucketName,
      Key: fileName, // File name you want to save as in S3
      Body: buffer,
      ContentType: mimetype,
    };

    // Uploading files to the bucket
    await s3.send(new PutObjectCommand(uploadParams));

    const image = await ImagesModel.create(obj);

    return res.json({ image });
  } catch (error) {
    // console.log(error);
    return next(error);
  }
};

const imagesFetch = async (req, res, next) => {
  try {
    const images = await ImagesModel.find();
    return res.json({ images });
  } catch (error) {
    return next(error);
  }
};

export { imagesUpload, imagesFetch };
