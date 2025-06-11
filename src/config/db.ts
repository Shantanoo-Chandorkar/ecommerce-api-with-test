// src/config/db.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
        maxPoolSize: 20,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 10000
    });
    console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`🔴 MongoDB connection error:`, error);
    process.exit(1); // Exit if DB fails
  }
};

export default connectDB;
