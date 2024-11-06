import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const uri = process.env.MONGODB_URI || '';

export const connect = async () => {
  if (mongoose.connection.readyState === 0) {  // Only connect if not already connected
    try {
      await mongoose.connect(uri);
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
};

// Remove or keep the close function for graceful shutdowns
export const close = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};