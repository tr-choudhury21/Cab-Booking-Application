const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
   
    
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      cabId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cab',
        required: true
      },
      driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
      },
      pickupLocation: {
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
      dropoffLocation: {
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
      fare: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      completedAt: {
        type: Date
      }
    });
    
bookingSchema.index({ pickupLocation: '2dsphere' });
bookingSchema.index({ dropoffLocation: '2dsphere' });
    


module.exports = mongoose.model('Booking', bookingSchema);
