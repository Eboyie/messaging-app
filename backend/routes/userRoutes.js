import express from 'express';
import protectedRoute from '../middleware/protectRoute.js';
import { getUserForSidebar } from '../controllers/userController.js';

const router = express.Router();

router.get('/', protectedRoute, getUserForSidebar);

export default router;
