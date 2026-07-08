import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const MessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 4.0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    distance: {
      type: Number,
      default: 1.0,
    },
    lunchPrice: {
      type: Number,
      required: true,
      default: 80,
    },
    dinnerPrice: {
      type: Number,
      required: true,
      default: 90,
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    todaysMenu: {
      lunch: {
        type: [String],
        default: [],
      },
      dinner: {
        type: [String],
        default: [],
      },
    },
    coordinates: {
      lat: {
        type: Number,
        default: 12.9716,
      },
      lng: {
        type: Number,
        default: 77.5946,
      },
    },
    reviews: [ReviewSchema],
  },
  {
    timestamps: true,
  }
);

const Mess = mongoose.model('Mess', MessSchema);
export default Mess;
