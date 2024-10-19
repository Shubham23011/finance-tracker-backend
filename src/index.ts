import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-record";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Using express.json() middleware to parse JSON requests
app.use(express.json());

// CORS
app.use(cors());

const mongoURI: string = process.env.MONGO_URI || ""; // Use the environment variable

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  });

// Use the financial record router for all backend API calls
app.use("/financial-records", financialRecordRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
