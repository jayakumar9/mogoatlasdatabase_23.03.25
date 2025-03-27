const Account = require("../models/Account");

// Get all accounts for the authenticated user
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new account
exports.createAccount = async (req, res) => {
  try {
    const { website, name, username, email, password, file, note } = req.body;
    const logo = `https://www.google.com/s2/favicons?domain=${website}`;
    
    let existingAccount = await Account.findOne({ website, username });
    if (existingAccount) return res.status(400).json({ message: "Username already exists for this website" });

    existingAccount = await Account.findOne({ website, email });
    if (existingAccount) return res.status(400).json({ message: "Email already exists for this website" });

    const newAccount = new Account({ website, name, username, email, password, file, note, logo, userId: req.user.id });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update an account
exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.params.id, userId: req.user.id });
    if (!account) return res.status(404).json({ message: "Account not found" });
    
    Object.assign(account, req.body);
    await account.save();
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an account
exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
