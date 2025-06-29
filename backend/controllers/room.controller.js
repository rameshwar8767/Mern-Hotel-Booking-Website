import Hotel from "../models/hotel.model.js";
//Api to add a new room for hotel
export const addRoom = async(req,res)=>{
    try {
        const {roomType,pricePerDay, amenities} = req.body;
        const hotel = await Hotel.findOne({owner: req.auth.userId});

        if(!hotel) return res.json({success: false, message:"No Hotel found"})

        

    } catch (error) {
        
    }
}

//Api to get all rooms
export const getRooms = async(req,res)=>{

}

//Api to get all rooms for a specific hotel
export const getOwnerRooms = async(req,res)=>{

}

//Api to toggle availability of a room
export const toggleRoomAvailability = async(req,res)=>{

}


