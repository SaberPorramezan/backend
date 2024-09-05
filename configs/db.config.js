const mongoose = require("mongoose");
const keys = require("../configs/keys");

const connectToDB = async () => {
  try {
    await mongoose.connect(keys.database.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connecttion error:", err);
    process.exit(1);
  }
};

module.exports = connectToDB;
