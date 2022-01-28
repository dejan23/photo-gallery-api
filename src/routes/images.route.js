import express from 'express';
import { imagesUpload, imagesFetch } from '../controllers/images.controller.js';

const router = express.Router();

router.post('/images/upload', imagesUpload);
router.get('/images/', imagesFetch);

export default router;
