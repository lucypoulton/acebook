const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  img: {
    data: Buffer,
    contentType: String
  },
  bio: String,
  following: [mongoose.Schema.Types.ObjectId]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
