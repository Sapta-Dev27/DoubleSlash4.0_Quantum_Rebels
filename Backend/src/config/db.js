import mongoose from "mongoose";
import 'dotenv/config';

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URL);
    if (connect) {
      console.log("Connected to MongoDB successfully");
    }
  }
  catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

export default connectDB;