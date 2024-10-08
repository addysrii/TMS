import express from 'express';
import { registerUser,getUserProfile,loginUser } from '../controller/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();



router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);


export default router;
