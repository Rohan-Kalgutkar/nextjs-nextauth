import mongoose from "mongoose";



export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const db = mongoose.connection;
        db.on("connected", () => {
            console.log("Mongoose connected to MongoDB");
        });
        db.on("error", (error) => {
            console.error("Mongoose connection error:"+ error);
            process.exit(1);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}