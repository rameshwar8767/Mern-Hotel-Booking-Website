import Booking from "../models/booking.model.js"
import Room from "../models/room.model.js";
import Hotel from "../models/hotel.model.js"


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

export const getHotelBookings = async(req,res)=>{
    try {
        const hotel = await Hotel.findOne({owner: req.auth.userId})
        if(!hotel) return res.json({success:false, message:"No Hotel Found"})

        const bookings = await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({createdAt: -1})

        //Total Bookings
        const totalBookings = bookings.length;
        // total revenue
        const totalRevenue = bookings.reduce((acc,booking)=> acc + booking.totalPrice, 0)

        res.json({success: true, dashboardData : {totalBookings,totalRevenue,bookings}})

    } catch (error) {
        res.json({success:false, message:"Failed to fetch bookings"})
    }
}