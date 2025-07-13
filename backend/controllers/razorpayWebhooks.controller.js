import crypto from "crypto";
import Booking from "../models/booking.model.js";
import { transporter } from "../configs/nodemailer.js";

// Razorpay Webhook Handler
export const razorpayWebhook = async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(req.rawBody) // <-- Make sure `express.raw()` is used in route!
    .digest("hex");

  if (signature !== expectedSignature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  try {
    const event = req.body;
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const bookingId = payment.notes?.bookingId;

      if (!bookingId) {
        return res.status(400).json({ success: false, message: "Missing bookingId in notes" });
      }

      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { isPaid: true },
        { new: true }
      ).populate("room hotel user");

      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }

      // Send confirmation email
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: booking.user.email,
        subject: "Payment Successful",
        html: `
          <h2>Payment Received</h2>
          <p>Your payment for booking <strong>${booking._id}</strong> has been successfully captured.</p>
          <p>Hotel: <strong>${booking.hotel.name}</strong></p>
          <p>Room Type: ${booking.room.roomType}</p>
          <p>Check-In: ${new Date(booking.checkInDate).toDateString()}</p>
          <p>Check-Out: ${new Date(booking.checkOutDate).toDateString()}</p>
          <p>Total Paid: ₹${booking.totalPrice}</p>
        `
      });

      console.log(`✅ Booking ${booking._id} marked as paid`);
    } else {
      console.log(`Unhandled event type: ${event.event}`);
    }

    res.status(200).json({ success: true, message: "Webhook processed successfully" });
  } catch (error) {
    console.error("❌ Razorpay Webhook Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
