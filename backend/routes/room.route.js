import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"; // multer config with 'images' field
import {
  addRoom,
  getRooms,
  getOwnerRooms,
  toggleRoomAvailability,
  getRoomById
} from "../controllers/room.controller.js";

const roomRouter = express.Router();

// ✅ POST /api/rooms - Add a new room (matches frontend form submission)
roomRouter.post("/", protect, upload.array("images", 4), addRoom);

// ✅ GET /api/rooms - Public route to fetch available rooms
roomRouter.get("/", getRooms);

// ✅ GET /api/rooms/owner - Get rooms for the logged-in hotel owner
roomRouter.get("/owner", protect, getOwnerRooms);

// ✅ POST /api/rooms/toggle-availability - Toggle room availability
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);

roomRouter.get("/:roomId", getRoomById); // ✅ GET /api/rooms/:roomId

// routes/room.route.js
roomRouter.patch('/toggle', protect, toggleRoomAvailability);


export default roomRouter;
