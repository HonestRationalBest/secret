import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect("mongodb+srv://korshunidzze:AiM4KwIiEZsHZLRK@cluster0.tfkjspj.mongodb.net/test");
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error.message);
  }
};
