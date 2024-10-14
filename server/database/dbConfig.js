
const mongoose = require('mongoose');
require('dotenv').config()

async function connectDB() {

const url = process.env.mongodbURL;
await mongoose.connect(url);
console.log('Data base connected')
}

module.exports = connectDB();