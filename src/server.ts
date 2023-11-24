import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import connectDB from './config/dbConnect';

dotenv.config();

connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
