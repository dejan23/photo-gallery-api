/* eslint-disable object-curly-newline */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { aws } from '../config/index.js';
import { HttpBadRequest } from './errors.util.js';

const { AWSAccessKeyId, AWSSecretKey } = aws;

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey,
  },
  region: 'eu-central-1',
});

const awss3Upload = async (data) => {
  try {
    const { key, buffer, mimetype, bucket } = data;

    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    return true;
  } catch (error) {
    throw new HttpBadRequest(error);
  }
};

export default awss3Upload;
