import Hotel from "../models/hotel.model.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/room.model.js";

// ✅ Add Room
// ✅ Add Room Controller
// controllers/room.controller.js


// ✅ Add Room
export const addRoom = async (req, res) => {
  try {
    const { roomType, pricePerDay, amenities } = req.body;
    const { userId } = await req.auth();

    const hotel = await Hotel.findOne({ owner: userId });
    if (!hotel) {
      return res.status(404).json({ success: false, message: "No Hotel found" });
    }

    // Upload each file from memory to Cloudinary using upload_stream
    const uploadedImages = await Promise.all(
      req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          });

          stream.end(file.buffer); // send buffer instead of path
        });
      })
    );

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerDay: Number(pricePerDay),
      amenities: JSON.parse(amenities),
      images: uploadedImages,
    });

    res.json({ success: true, message: "Room added successfully" });
  } catch (error) {
    console.error("addRoom error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Get All Rooms (for frontend browsing)
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    console.error("getRooms error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Owner Rooms (dashboard)
export const getOwnerRooms = async (req, res) => {
  try {
    const { userId } = await req.auth();

    const hotelData = await Hotel.findOne({ owner: userId });
    if (!hotelData) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");

    res.json({ success: true, rooms });
  } catch (error) {
    console.error("getOwnerRooms error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Toggle Availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.json({ success: true, message: "Room availability updated" });
  } catch (error) {
    console.error("toggleRoomAvailability error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Room By ID
export const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId)
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "name email image",
        },
      });

    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    res.json({ success: true, room });
  } catch (error) {
    console.error("getRoomById error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



