const express = require("express");
const { getAccounts, createAccount, updateAccount, deleteAccount } = require("../controllers/accountController");
const { verifyToken } = require("../config/authMiddleware");

const router = express.Router();

// Get all accounts for authenticated user
router.get("/", verifyToken, getAccounts);

// Create a new account
router.post("/", verifyToken, createAccount);

// Update an account
router.put("/:id", verifyToken, updateAccount);

// Delete an account
router.delete("/:id", verifyToken, deleteAccount);

module.exports = router;