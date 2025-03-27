const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  serialNumber: { type: Number, unique: true },
  website: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  logo: { type: String },
  file: { type: String },
  note: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

// Auto-increment serial number
AccountSchema.pre("save", async function (next) {
  if (!this.serialNumber) {
    const lastAccount = await this.constructor.findOne().sort("-serialNumber");
    this.serialNumber = lastAccount ? lastAccount.serialNumber + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("Account", AccountSchema);
