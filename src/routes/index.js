import ImagesRoutes from './images.route.js';
import { HttpNotFound } from '../utils/errors.util.js';

const routes = (app) => {
  app.use('/api/v1', ImagesRoutes);
  app.get('/api/v1/health', (req, res) => res.json({ status: 'ok' }));
  app.get('*', (req, res, next) => {
    next(new HttpNotFound());
  });
};

export default routes;
