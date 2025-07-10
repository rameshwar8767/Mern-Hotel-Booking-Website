import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  roomType: String,
  pricePerDay: Number,
  amenities: [String],
  images: [String],
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;
