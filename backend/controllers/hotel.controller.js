import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";

export const registerHotel = async (req, res) => {
  try {
    const { userId } = await req.auth(); // ✅ Clerk user ID (string)

    // Optional: you can fetch User data if needed
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { name, address, contact, city } = req.body;

    // ✅ Check if hotel exists using Clerk userId, not Mongo _id
    const existingHotel = await Hotel.findOne({ owner: userId });
    if (existingHotel) {
      return res.json({ success: false, message: "Hotel already registered" });
    }

    // ✅ Save Clerk userId directly as owner
    await Hotel.create({ name, address, contact, city, owner: userId });

    // ✅ Update user role if needed
    await User.findByIdAndUpdate(user._id, { role: "hotelOwner" });

    res.json({ success: true, message: "Hotel registered successfully" });
  } catch (error) {
    console.error("registerHotel error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/hotels/:id
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    // Optional: Manually attach user email
    const owner = await User.findOne({ clerkId: hotel.owner }).select("email");
    const hotelWithOwner = {
      ...hotel.toObject(),
      owner,
    };

    res.json({ success: true, hotel: hotelWithOwner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
