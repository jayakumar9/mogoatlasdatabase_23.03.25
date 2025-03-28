const express = require("express");
const User = require("../models/User");  // Import the User model
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Route to store user’s database & collection preferences
router.post("/preferences", authenticateUser, async (req, res) => {
  try {
    const { database, collection } = req.body;  // Get selection from frontend
    await User.findByIdAndUpdate(req.user.id, { database, collection }); // Update user record
    res.json({ message: "Preferences updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating preferences" });
  }
});

// ✅ Route to get user’s database & collection preference
router.get("/preferences", authenticateUser, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json({
        database: user.database || "default_db",
        collection: user.collection || "default_collection",
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching preferences" });
    }
  });
  

module.exports = router;
