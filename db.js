const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connect!");
  } catch (err) {
    console.error("Cant't connect to database:", err);
  }
}

module.exports = { connect };
