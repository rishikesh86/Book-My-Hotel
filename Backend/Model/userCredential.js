const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    contactDetails: {
      userType: { type: Number, required: [true, "userType must be provide"] },
      name: { type: String, required: true },
      email: { type: String, required: [true, "email must be provide"] },
      phonenumber: {
        type: Number,
        required: [true, "phonenumber must be provide"],
      },
      password: { type: String, required: [true, "password must be provide"] },
      pinCode: { type: Number, required: [true, "pincode must be provide"] },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    address: {
      country: String,
      state: String,
      district: String,
    },
    security: {
      otp: { type: Boolean, default: false },
    },
    type: {
      category: { type: String, require: true },
    },
    permission: {
      accept: { type: Boolean, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userCredential", userSchema);
