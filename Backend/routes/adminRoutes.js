import express from 'express';
import adminControllerFunction from '../controller/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Dashboard
router.get('/dashboard', protect, admin, adminControllerFunction.getDashboardData);

// Manage Events
router.get('/events', protect, admin, adminControllerFunction.getAllEvents);
router.post('/events', protect, admin, adminControllerFunction.createEvent);
router.put('/events/:id', protect, admin, adminControllerFunction.updateEvent);
router.delete('/events/:id', protect, admin, adminControllerFunction.deleteEvent);

// Manage Users
router.get('/users', protect, admin, adminControllerFunction.getAllUsers);
router.delete('/users/:id', protect, admin, adminControllerFunction.deleteUser);

// Manage Bookings

router.put('/bookings/:id', protect, admin, adminControllerFunction.updateBookingStatus);

export default router;
