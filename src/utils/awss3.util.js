/* eslint-disable object-curly-newline */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { aws } from '../config/index.js';
import { HttpBadRequest } from './errors.util.js';
import imageCheck from './imageCheck.util.js';

const { AWSAccessKeyId, AWSSecretKey, AWSRegion } = aws;

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey,
  },
  region: AWSRegion,
});

const awss3Upload = async (data) => {
  try {
    const { key, buffer, mimetype, bucket } = data;

    const { imageBody, widthCM, heightCM } = await imageCheck(buffer);

    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: imageBody,
      ContentType: mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    return { widthCM, heightCM };
  } catch (error) {
    throw new HttpBadRequest(error.message);
  }
};

export default awss3Upload;
