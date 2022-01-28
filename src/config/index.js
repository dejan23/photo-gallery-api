import dotenv from 'dotenv';

dotenv.config();

const base = {
  port: process.env.NODE_PORT || 5000,
  env: process.env.NODE_ENV || 'development',
};

const mongodb = {
  uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/photo-galery',
};

const aws = {
  AWSAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  AWSSecretKey: process.env.AWS_SECRET_KEY,
  AWSBucketName: process.env.AWS_S3_BUCKET_NAME,
};

export { base, mongodb, aws };
