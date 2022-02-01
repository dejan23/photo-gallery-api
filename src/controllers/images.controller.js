import processFileMiddleware from '../utils/multer.util.js';
import { HttpValidationError } from '../utils/errors.util.js';
import {
  imagesUploadService,
  imagesFetchService,
} from '../services/images.service.js';

const imagesUpload = async (req, res, next) => {
  try {
    await processFileMiddleware(req, res);

    if (!req.file) {
      throw new HttpValidationError('Provide an image');
    }

    return res.json({ image: await imagesUploadService(req.file) });
  } catch (error) {
    return next(error);
  }
};

const imagesFetch = async (req, res, next) => {
  try {
    return res.json({ images: await imagesFetchService() });
  } catch (error) {
    return next(error);
  }
};

export { imagesUpload, imagesFetch };
