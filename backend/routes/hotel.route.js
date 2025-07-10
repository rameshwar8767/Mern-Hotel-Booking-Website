import express from "express"
import { protect } from "../middlewares/auth.middleware.js"
import { registerHotel, getHotelById } from "../controllers/hotel.controller.js";

const hotelRouter = express.Router()

hotelRouter.post('/',protect,registerHotel)
hotelRouter.get("/:id", getHotelById); // ✅ Add this route

export default hotelRouter;