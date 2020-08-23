const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
