const express = require("express");
const protect = require("../middleware/auth.middleware");
const Client = require("../models/Client.model");
const Project = require("../models/Project.model");

const router = express.Router();

router.get("/stats", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const clients = await Client.countDocuments({ user: userId });
    const activeProjects = await Project.countDocuments({
      user: userId,
      status: "active"
    });

    res.json({ clients, activeProjects });
  } catch (err) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
});

module.exports = router;
