import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import eventRoutes from './routes/eventsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import adminRoutes from "./routes/adminRoutes.js"
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
