const mongoose = require('mongoose');

require('dotenv').config();



const connectDB = async () => {

    
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err.message);

        console.log(err)
        process.exit(1);
    }
}



module.exports = connectDB;