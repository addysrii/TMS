import express from 'express';
import { createEvent, getEvents, getEventById, bookEvent } from '../controller/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
const router = express.Router();



router.post('/', protect, admin,upload.single('image'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/:id/book', protect, bookEvent);




export default router;
