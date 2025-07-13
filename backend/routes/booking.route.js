import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
  addBooking,
  checkAvailabilityAPI,
  getHotelBookings,
  getUserBookings,
  razorPayPayment,
  verifyPayment,
} from "../controllers/booking.controller.js";

import { razorpayWebhook } from "../controllers/razorpayWebhooks.controller.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, addBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getHotelBookings); // ✅ FIXED METHOD + PATH
bookingRouter.post('/razorpay-payment', protect, razorPayPayment);
bookingRouter.post('/verify-payment', protect, verifyPayment);

bookingRouter.post(
  "/razorpay-webhook",
  express.raw({ type: "application/json" }), // required for webhook validation
  razorpayWebhook
);

export default bookingRouter;
