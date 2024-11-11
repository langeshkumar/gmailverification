import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const gmaildatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('Database connected..!');
    } catch (error) {
        console.error({
            message: "Database connection failed..!",
            error: error.message
        });
        process.exit(1);
    }
}

export default gmaildatabase