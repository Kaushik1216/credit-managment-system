const mongoose = require("mongoose");
// MONGO_DATABASE_URI=mongodb+srv://kaushik:k2003MANDI@cluster0.a5iakkw.mongodb.net/Credit-manage?retryWrites=true&w=majority
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`[STATUS] Connected to Database: ${conn.connection.name}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;