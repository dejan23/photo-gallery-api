import sharp from 'sharp';
import { imageSize } from './constants.util.js';

const { MAX_WIDTH_CM, MAX_WIDTH_PX } = imageSize;

const imageCheck = async (data) => {
  let imageBody = data;

  const metaReaderInfo = await sharp(imageBody).metadata();

  let widthCM = (metaReaderInfo.width * 2.54) / 250;
  let heightCM = (metaReaderInfo.height * 2.54) / 250;

  if (widthCM > MAX_WIDTH_CM) {
    imageBody = await sharp(imageBody)
      .resize({ width: MAX_WIDTH_PX })
      .toBuffer();

    const metaReaderInfoAfterResize = await sharp(imageBody).metadata();

    widthCM = (metaReaderInfoAfterResize.width * 2.54) / 250;
    heightCM = (metaReaderInfoAfterResize.height * 2.54) / 250;
  }

  widthCM = Math.ceil(widthCM);
  heightCM = Math.ceil(heightCM);

  return { imageBody, widthCM, heightCM };
};

export default imageCheck;
