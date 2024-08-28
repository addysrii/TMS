import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import eventRoutes from './routes/eventsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {

}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/uploads/EventImages', express.static(path.join(__dirname, '/uploads/EventImages')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
