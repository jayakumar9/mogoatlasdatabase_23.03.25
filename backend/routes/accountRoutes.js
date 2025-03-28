const express = require("express");
const Account = require("../models/Account");
const fetchWebsiteLogo = require("../utils/fetchLogo");

const router = express.Router();

// Apply RBAC to API Routes
const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");
const {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount
} = require("../controllers/accountController");


// 🛡 Users can only access their own accounts
router.get("/", authenticateUser, getAccounts);

// 🛡 Only admins can create, update, or delete any account
router.post("/", authenticateUser, authorizeAdmin, createAccount);
router.put("/:id", authenticateUser, authorizeAdmin, updateAccount);
router.delete("/:id", authenticateUser, authorizeAdmin, deleteAccount);

// Create a new account
router.post("/create", async (req, res) => {
  try {
    const { website, name, username, email, password, note } = req.body;

    // Auto-fetch website logo
    const logo = await fetchWebsiteLogo(website);

    // Auto-increment serial number
    const lastAccount = await Account.findOne().sort({ serialNumber: -1 });
    const serialNumber = lastAccount ? lastAccount.serialNumber + 1 : 1;

    const newAccount = new Account({
      serialNumber,
      website,
      name,
      username,
      email,
      password,
      logo,
      note,
    });

    await newAccount.save();
    res.status(201).json({ message: "Account saved successfully", newAccount });
  } catch (error) {
    res.status(500).json({ error: "Error saving account" });
  }
});

// Get all accounts (only user-specific)
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving accounts" });
  }
});

// Update an account
router.put("/update/:id", async (req, res) => {
  try {
    const { website, name, username, email, password, note } = req.body;

    // Fetch updated logo if website field changes
    let logo;
    if (website) {
      logo = await fetchWebsiteLogo(website);
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      { website, name, username, email, password, logo, note },
      { new: true }
    );

    res.status(200).json({ message: "Account updated successfully", updatedAccount });
  } catch (error) {
    res.status(500).json({ error: "Error updating account" });
  }
});

// Delete an account
router.delete("/delete/:id", async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting account" });
  }
});

//Modify the API to fetch data from the correct database & collection.
router.get("/accounts", authenticateUser, async (req, res) => {
    try {
      const { db, collection } = req.query;
  
      // Dynamic database selection
      const AccountModel = mongoose.connection.useDb(db).model(collection, Account.schema);
  
      const accounts = await AccountModel.find({ user: req.user.id });
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching accounts" });
    }
  });
  
module.exports = router;


