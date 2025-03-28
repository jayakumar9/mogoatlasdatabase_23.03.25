const express = require("express");
const router = express.Router();
const { getDatabase } = require("../config/database");

// ✅ Get all accounts (based on selected database & collection)
router.get("/", async (req, res) => {
  try {
    const { db, collection } = req.query;
    if (!db || !collection) {
      return res.status(400).json({ message: "Database and collection are required" });
    }

    const database = getDatabase(db);
    const accountsCollection = database.collection(collection);
    const accounts = await accountsCollection.find().toArray();

    res.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Create a new account
router.post("/", async (req, res) => {
  try {
    const { db, collection, website, username, email, logo } = req.body;
    if (!db || !collection || !website || !username || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const database = getDatabase(db);
    const accountsCollection = database.collection(collection);

    // Auto-increment serial number
    const lastAccount = await accountsCollection.find().sort({ serialNumber: -1 }).limit(1).toArray();
    const serialNumber = lastAccount.length > 0 ? lastAccount[0].serialNumber + 1 : 1;

    const newAccount = { serialNumber, website, username, email, logo };
    await accountsCollection.insertOne(newAccount);

    res.status(201).json({ message: "Account created successfully", newAccount });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Update an existing account
router.put("/:id", async (req, res) => {
  try {
    const { db, collection, website, username, email, logo } = req.body;
    if (!db || !collection || !website || !username || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const database = getDatabase(db);
    const accountsCollection = database.collection(collection);

    const updatedAccount = { website, username, email, logo };
    await accountsCollection.updateOne({ _id: req.params.id }, { $set: updatedAccount });

    res.json({ message: "Account updated successfully" });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Delete an account
router.delete("/:id", async (req, res) => {
  try {
    const { db, collection } = req.query;
    if (!db || !collection) {
      return res.status(400).json({ message: "Database and collection are required" });
    }

    const database = getDatabase(db);
    const accountsCollection = database.collection(collection);
    await accountsCollection.deleteOne({ _id: req.params.id });

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
