const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-auto-increment");
require("./config");

// autoIncrement.initialize(connection);

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  timecreated: {
    type: Date,
    default: Date.now,
  },
  timemodified: {
    type: Date,
    default: Date.now,
  },
  suspended: {
    type: Boolean,
    default: false,
  },
});

// Counter Collection
const counterSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  seq: {
    type: Number,
  },
});

const userImageSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const Counter = mongoose.model("counter", counterSchema);
const User = mongoose.model("User", userSchema);
const UserImage = mongoose.model("UserImage", userImageSchema);

module.exports = { User, UserImage, Counter };
