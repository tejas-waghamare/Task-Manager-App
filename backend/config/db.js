const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully.....!✨🌐');
    console.log('📊 MongoDB Database:', mongoose.connection.db.databaseName);
  } catch (err) {
    console.error('❌MongoDB Connection Error:.....!⭕', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;