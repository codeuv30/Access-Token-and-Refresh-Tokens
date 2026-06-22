import mongoose from "mongoose";

async function connectToDB () {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        error.message = "MongoDB connection error";
        throw error;
    }
}

export default connectToDB;