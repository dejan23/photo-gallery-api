/* eslint-disable object-curly-newline */
import ImagesModel from '../models/images.model.js';
import awss3Upload from '../utils/awss3.util.js';
import { aws } from '../config/index.js';
import { HttpBadRequest } from '../utils/errors.util.js';

const { AWSBucketName } = aws;

const imagesUploadService = async (data) => {
  const { originalname, buffer, size, mimetype } = data;

  const fileName = originalname.replace(/ /g, '-');

  const imageExist = await ImagesModel.findOne({ key: fileName });

  if (imageExist) {
    throw new HttpBadRequest(`${fileName} - this image already uploaded`);
  }

  const obj = {
    key: fileName,
    buffer,
    size,
    src: `https://${AWSBucketName}.s3.amazonaws.com/${fileName}`,
    bucket: AWSBucketName,
    mimetype,
  };

  const { widthCM, heightCM } = await awss3Upload(obj);

  const image = await ImagesModel.create({ ...obj, widthCM, heightCM });

  return image;
};

const imagesFetchService = async () => {
  const images = await ImagesModel.find();

  return images;
};

export { imagesUploadService, imagesFetchService };
