const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {


  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      try {
        const userData = verifyToken(token);
        console.log("Read Successful user", userData.username);
        req.user = userData;
      } catch (err) {
        console.log('Authorization Error!', err);
        return;
      }
    }
  }


  next();
};
