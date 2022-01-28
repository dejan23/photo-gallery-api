import { base } from './src/config/index.js';
import app from './src/app.js';
import connectToMongo from './src/dbs/mongo.db.js';

const { port } = base;

const start = () => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}.`);
  });

  connectToMongo();
};

start();
