const { Schema, model } = require("mongoose");

//User schema username/email/pass
const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength: [3, 'Username must me at least 3 characters long!'] },
  email: {type: String,required: true,unique: true},
  hashedPassword: { type: String, required: true },
});

userSchema.index({ username: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

userSchema.index({ email: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;