import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/user.route.js";
import hotelRouter from "./routes/hotel.route.js";
import roomRouter from "./routes/room.route.js";
import bookingRouter from "./routes/booking.route.js";


// ✅ Load .env first
dotenv.config();

// ✅ Connect to DB & Cloudinary
connectDB()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

connectCloudinary();

// ✅ Init Express
const app = express();

// ✅ Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(clerkMiddleware());



// ✅ API Routes
app.get("/", (req, res) => {
  res.send("✅ API is Working");
});

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
