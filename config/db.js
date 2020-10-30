const mongoose = require('mongoose');

// Connect MongoDB at default port 27017.

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connection Succeeded at ${conn.connection.host}`);
  } catch (err) {
    console.log('Error in DB connection: ' + err);
    process.exit(1);
  }
};

module.exports = connectDB;
