const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    username: { type: String,  required: [true, "username is required"], },
    email: { type: String,  required: [true, "email is required"], unique: true },
    password: { type: String,  required: [true, "password is required"], },
    

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
        required: [true, "phone no is required"],
      },
      
     address: {
        type: String,
        required: [true, "address is required"],
    },
     city: {
        type: String,
        required: [true, "city is required"],
    },
     pin: {
        type: Number,
        required: [true, "pin is required"],
        
    },
    location:{
       
            type: {
              type: String,
              enum: ['Point'],
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
    },
    

  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  cabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cab',
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;