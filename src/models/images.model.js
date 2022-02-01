import mongoose from 'mongoose';

const imagesSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    bucket: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    widthCM: {
      type: Number,
      required: true,
    },
    heightCM: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ImagesModel = mongoose.model('images', imagesSchema);

export default ImagesModel;
