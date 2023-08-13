const mongoose = require("mongoose");
require("./config");

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
  suspended: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  timecreated: {
    type: Date,
    default: Date.now,
  },
  timemodified: {
    type: Date,
    default: Date.now,
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
  id: {
    type: Number,
    unique: true,
  },
  userId: {
    type: Number,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  filetype:{
    type: String
  },
  filepath: {
    type: String
  },
  lastModifiedAt: {
    type: Date,
    default: Date.now,
  }
});

const Counter = mongoose.model("counter", counterSchema);
const User = mongoose.model("User", userSchema);
const UserImage = mongoose.model("UserImage", userImageSchema);

module.exports = { User, UserImage, Counter };
