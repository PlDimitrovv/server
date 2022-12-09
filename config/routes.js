const authController = require("../controllers/authController");
const artController = require("../controllers/artController");

module.exports = (app) => {
  app.use("/", artController);
  app.use("/auth", authController);
};
