require("dotenv").config();
const mongoose = require('mongoose');
const mongoUri = process.env.MongoURL;


const connectToMongo = async () => {
    await mongoose.connect(mongoUri);
    console.log("Database Connected Successfully");
}

module.exports = connectToMongo;

