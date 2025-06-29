import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";

export const registerHotel = async(req,res)=>{
    try {
        const {name,address, contact,city} = req.body;
        const owner = req.user._id;

        // Check if user Already Registred
        const hotel = await Hotel.findOne({owner})
        if(hotel){
            return res.json({success:false, message:"Hotel Already Registred"})
        }
        await Hotel.create({name,address,contact,city,owner})

        await user.findByIdAndUpdate(owner,{role:"hotelOwner"});

        res.json({success:true,message: "Hotel Registred Successfully"})
    } catch (error) {
        res.json({success:false,message: error.message})
    }
}