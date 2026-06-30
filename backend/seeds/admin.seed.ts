import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import dotenv from "dotenv";
import connectDB from "../config/db"

dotenv.config()

const seedAdmin = async () => {
    try {
        await connectDB()

        const existingAdmin = await User.findOne({email: "wannes.hene@gmail.com"})
        if (existingAdmin) {
            console.log("Admin already exists");
            return
        }

        const hashedPassword = await bcryptjs.hash("123456", 10)

        await User.create({
            email: "wannes.hene@gmail.com",
            password: hashedPassword,
        })

        console.log("Admin created successfully");
        process.exit()
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1)
    }
}

seedAdmin()