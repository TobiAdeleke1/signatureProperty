import express from 'express';
import {searchProperty} from '../controllers/searchProperty.js';

const router = express.Router();

router.get("/search", searchProperty);

export default router;