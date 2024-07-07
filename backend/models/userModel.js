const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: [true, "username is required"] },
  email: { type: String, required: [true, "email is required"], unique: true },
  password: { type: String, required: [true, "password is required"] },

  isAdmin: { type: Boolean, default: false },
  isDriver: { type: Boolean, default: false },

  firstName: {
    type: String,
    required: [true, "first name is required"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
    trim: true
  },
  phone: {
    type: String,
    required: [true, "phone no is required"]
  },

  address: {
    type: String,
    required: [true, "address is required"]
  },
  city: {
    type: String,
    required: [true, "city is required"]
  },
  pin: {
    type: Number,
    required: [true, "pin is required"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
