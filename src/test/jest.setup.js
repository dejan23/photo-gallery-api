import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongoServer = new MongoMemoryServer();

const dbConnect = async () => {
  await mongoServer.start();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
