import mongoose from "mongoose";

const gmaildatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/upgradproject');
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