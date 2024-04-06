import mongoose, { Schema } from "mongoose"

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true, // Corrected typo in 'require' to 'required'
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    facilities: [{ type: String }],
    roomTypes: [
      {
        type: { type: String },
        price: { type: Number },
        available: { type: Boolean, default: true },
        capacity: { type: String },
        amenities: [{ type: String }],
      },
    ],
    reviews: [
      {
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
        review: String,
        rating: Number,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
)

export const Hotel = mongoose.model("Hotel", HotelSchema)
