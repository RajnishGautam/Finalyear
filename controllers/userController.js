const User = require("../models/User");

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (id !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.updateUserField = async (req, res) => {
  const { id } = req.params;
  if (id !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

  try {
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (id !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted" });
};

// Add/remove savedArticles, readingHistory, preferences similarly
exports.addSavedArticle = async (req, res) => {
  const { id } = req.params;
  const { articleId } = req.body;
  if (id !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

  const user = await User.findById(id);
  if (!user.savedArticles.includes(articleId)) {
    user.savedArticles.push(articleId);
    await user.save();
  }

  res.json(user);
};

exports.removeSavedArticle = async (req, res) => {
  const { id } = req.params;
  const { articleId } = req.body;
  if (id !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

  const user = await User.findById(id);
  user.savedArticles = user.savedArticles.filter((a) => a !== articleId);
  await user.save();

  res.json(user);
};
