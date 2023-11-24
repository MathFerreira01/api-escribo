import mongoose from 'mongoose';

// conect database

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.DATABASE_URL as string);
      console.log('Database connection successful');
   } catch (error) {
      console.log('Database connection error');
   }
};

export default connectDB;