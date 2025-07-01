import express from "express"
import { protect } from "../middlewares/auth.middleware.js"
import { registerHotel } from "../controllers/hotel.controller.js"
import { addBooking, checkAvailabilityAPI, getHotelBookings, getUserBookings } from "../controllers/booking.controller.js"

const bookingRouter = express.Router()

bookingRouter.post('/check-availability',checkAvailabilityAPI)
bookingRouter.post('/book',protect,addBooking)
bookingRouter.get('/user',protect,getUserBookings)
bookingRouter.post('/hotel',protect,getHotelBookings)


export default bookingRouter;