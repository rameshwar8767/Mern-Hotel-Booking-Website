import Booking from "../models/booking.model.js"
import Room from "../models/room.model.js";
import Hotel from "../models/hotel.model.js"
import { transporter } from "../configs/nodemailer.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Function to Check Availability Of Room
export const checkAvailability = async({checkInDate,checkOutDate,room})=>{
    try {
        const bookings = await Booking.find({
            room,
            checkInDate:{$lte: checkInDate},
            checkOutDate:{$lte: checkOutDate},
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;

    } catch (error) {
        console.error(error.message)
    }
}

//Api to check availability of room
//Post /api/bookings/check-availability
export const checkAvailabilityAPI = async(req,res)=>{
    try {
        const {room,checkInDate, checkOutDate} = req.body;
        const isAvailable = await checkAvailability({checkInDate,checkOutDate,room})
        res.json({success: true, isAvailable})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}


//Api to add a new booking
//POST /api/bookings/book

export const addBooking = async(req,res)=>{
    try {
        const {room,checkInDate,checkOutDate,guests} = req.body
        const user = req.user._id

        // Before Booking Check Availability
        const isAvailable = await checkAvailability({
            checkInDate,checkOutDate,room
        })
        if(!isAvailable) return res.json({success:false,message:"room is not available"})

        // Get totalPrice from Room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerDay;
        // calculate totalPrice based on days
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)

        const timeDiff = checkOut.getTime()-checkIn.getTime();
        const days = Math.ceil(timeDiff / (1000*3600*24));
        totalPrice *= days;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests:+guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })
        const mailOptions ={
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Hotel Booking Details",
            html:`
               <h2>Your Booking Details</h2>
               <p> Dear ${req.user.username},</p>
               <p>Thank you for booking with us! Here are your booking details:</p>
               <ul>
                <li><strong>Booking ID:</strong> ${booking._id}</li>
                <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                <li><strong>Room Type:</strong> ${roomData.roomType}</li>
                <li><strong>Check-In Date:</strong> ${new Date(booking.checkInDate).toDateString()}</li>
                <li><strong>Check-Out Date:</strong> ${new Date(booking.checkOutDate).toDateString()}</li>
                <li><strong>Total Price:</strong> ₹${booking.totalPrice} </li>
               </ul>
               <p>We look forward to welcoming you!</p>
               <p>if you have any questions or need assistance, feel free to contact us.</p>
            `
        }
        await transporter.sendMail(mailOptions)
        res.json({success:true, message:"Add Booking Successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

// Api to get all bookings for a user
//Get /api/bookings/user

export const getUserBookings = async (req,res)=>{
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort(
            {createdAt: -1}
        )
        res.json({success:true,bookings})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Failed to fetch bookings"})
    }
}

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) {
      return res.json({ success: false, message: "No Hotel Found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;

    const totalRevenue = bookings.reduce((acc, booking) => {
      return booking.isPaid ? acc + booking.totalPrice : acc;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Dashboard data loaded successfully",
      data: {
        bookings,
        totalBookings,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Error in getHotelBookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

// controllers/booking.controller.js






export const verifyPayment = async (req, res) => {
  try {
    const {
      bookingId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      console.error("❌ Razorpay secret key is missing in environment variables.");
      return res.status(500).json({
        success: false,
        message: "Server configuration error: Razorpay secret is not set.",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        isPaid: true,
        paymentInfo: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




export const razorPayPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.json({ success: false, message: "Booking not found" });

    const roomData = await Room.findById(booking.room).populate("hotel");
    if (!roomData) return res.json({ success: false, message: "Room not found" });

    const totalPrice = booking.totalPrice;

    const razorpayInstance = new Razorpay({ // ✅ fixed here
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: totalPrice * 100, // in paise
      currency: "INR",
      receipt: `receipt_booking_${bookingId}`,
      notes: {
        bookingId: bookingId,
        room: roomData.roomType,
      }
    };

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.json({ success: false, message: "Failed to create Razorpay order" });
    }

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ success: false, message: "Payment failed", error: error.message });
  }
};




