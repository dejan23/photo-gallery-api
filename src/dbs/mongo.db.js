import mongoose from 'mongoose';
import { mongodb } from '../config/index.js';

const connectToMongo = async () => {
  try {
    const db = await mongoose.connect(mongodb.uri);

    console.log(`Connected to mongo database "${db.connections[0].name}"`);
  } catch (err) {
    console.log('There was an error connecting to db', err);
  }
};

export default connectToMongo;
