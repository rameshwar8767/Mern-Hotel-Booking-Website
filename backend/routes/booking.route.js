import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
  addBooking,
  checkAvailabilityAPI,
  getHotelBookings,
  getUserBookings,
  razorPayPayment,
  verifyPayment, // ✅ add this
} from "../controllers/booking.controller.js";

import { razorpayWebhook } from "../controllers/razorpayWebhooks.controller.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, addBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.post('/hotel', protect, getHotelBookings);
bookingRouter.post('/razorpay-payment', protect, razorPayPayment);
bookingRouter.post('/verify-payment', protect, verifyPayment); // ✅ added

bookingRouter.post(
  "/razorpay-webhook",
  express.raw({ type: "application/json" }), // required for webhook validation
  razorpayWebhook
);

export default bookingRouter;
