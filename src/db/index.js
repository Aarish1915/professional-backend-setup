import mongoose from 'mongoose';
import { MONGODB_URL, DB_NAME } from '../config/index.js';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
    console.log(`MongoDB connected successfully: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

export default connectDB;