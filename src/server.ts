import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import connectDB from './config/dbConnect';
import userRoutes from './routes/userRoutes';

dotenv.config();

const server = express()

connectDB()

const PORT = process.env.PORT || 3000;

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

server.use('/auth', authRoutes);
server.use('/user', userRoutes); 

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
