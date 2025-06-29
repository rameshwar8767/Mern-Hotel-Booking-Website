import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const roomSchema = new Schema({
    hotel: {type: String, ref:"Hotel", required: true},
    hotel: {type: String, required: true},
    pricePerDay: {type: Number, required: true},
    amenities: {type: Array, required: true},
    images: [{type: String}],
    isAvailable: {type: Boolean, default:true},
    
},{timestamps:true})

const Room = mongoose.model('Room',roomSchema)
export default Room