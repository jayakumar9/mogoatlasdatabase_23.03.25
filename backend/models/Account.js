const mongoose = require("mongoose");

// Import helper function to fetch website logo
const fetchWebsiteLogo = require("../utils/fetchLogo");

// Define the schema
const AccountSchema = new mongoose.Schema(
  {
    serialNumber: { type: Number, unique: true }, // Auto-incrementing serial number
    website: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    logo: { type: String }, // Auto-fetched website logo URL
    note: { type: String },
  },
  { timestamps: true }
);

// Pre-save middleware to auto-increment serial number and fetch website logo
AccountSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      // Auto-increment serial number
      const lastAccount = await mongoose.model("Account").findOne().sort({ serialNumber: -1 });
      this.serialNumber = lastAccount ? lastAccount.serialNumber + 1 : 1;

      // Fetch website logo if not manually provided
      if (!this.logo) {
        this.logo = await fetchWebsiteLogo(this.website);
      }
    } catch (error) {
      console.error("Error setting serial number or fetching logo:", error);
    }
  }
  next();
});

module.exports = mongoose.model("Account", AccountSchema);
