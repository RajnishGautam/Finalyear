const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  bio: { type: String, default: "" },
  joinedDate: String,
  avatarUrl: { type: String, default: "" },
  savedArticles: [String],
  readingHistory: [String],
  preferences: [String],
});

module.exports = mongoose.model("User", userSchema);
