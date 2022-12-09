const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JST_SECRET = "wetq341412dwataw4qz";

function verifyToken(token) {
  return jwt.verify(token, JST_SECRET)
}

function createSession({ _id, username, email }) {
  const payload = {
    _id,
    username,
    email: email
  };

  const token = jwt.sign(payload, JST_SECRET);
  return {
    email: email,
    username: username,
    accessToken: token,
  }
  
}

async function register(email, username, password) {
  
  const existingUser = await User.findOne({ username }).collation({ locale: "en", strength: 2 });
  const existingEmail = await User.findOne({ email }).collation({ locale: "en", strength: 2 });
  if (existingUser) {
    throw new Error("Username is taken");
  }

  if (existingEmail) {
    throw new Error("Email is taken");
  }
 
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    username,
    hashedPassword,
  });
  return createSession(user);
}

async function login(email, password) {
  const user = await User.findOne({ email }).collation({ locale: "en", strength: 2 });

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const hasMatch = await bcrypt.compare(password, user.hashedPassword);

  if (hasMatch == false) {
    throw new Error("Incorrect email or password");
  }
  return createSession(user);
}


function logout(token) {
  blacklist.add(token)
}

module.exports = {
  register,
  login,
  verifyToken,
};
