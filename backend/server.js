import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/user.route.js";
import hotelRouter from "./routes/hotel.route.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/room.route.js";
import bookingRouter from "./routes/booking.route.js";





connectDB()
.then(() => console.log("Database connected successfully"))
.catch((error) => console.error("Database connection failed:", error));
connectCloudinary()
const app = express();
app.use(cors())

//Middleware
app.use(express.json());
app.use(clerkMiddleware())


// API to listen to clerk webhooks

app.use('/api/clerk',clerkWebhooks)
app.get('/', (req,res)=>{
    res.send("Api Is Working")
})
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});