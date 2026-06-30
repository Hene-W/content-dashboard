import express from"express";
import dotenv from"dotenv";
import cors from"cors";
import cookieParser from 'cookie-parser'
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express() 

app.use(express.json()); 
app.use(cors()); 
app.use(cookieParser())

app.use("/api/auth", authRoutes)

connectDB();

const PORT = process.env.PORT || 5000
app.listen(PORT,() => {
console.log(`Server running on port ${PORT}`);
});