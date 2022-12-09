const mongoose = require("mongoose");


const CONNECTION_STRING = "mongodb://0.0.0.0:27017/artHub";

module.exports = async (app) => {
  try {
    mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
