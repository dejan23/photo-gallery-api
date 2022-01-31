import dotenv from 'dotenv';

dotenv.config();

const base = {
  port: process.env.NODE_PORT || 5000,
  env: process.env.NODE_ENV || 'development',
};

const mongodb = {
  uri: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
};

const aws = {
  AWSAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  AWSSecretKey: process.env.AWS_SECRET_KEY,
  AWSBucketName: process.env.AWS_S3_BUCKET_NAME,
  AWSRegion: process.env.AWSRegion,
};

export { base, mongodb, aws };
