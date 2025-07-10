import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    profileImage: { type: String, required: true }, // ✅ match controller
    role: { type: String, default: "user" },
    recentSearchedCities: [String],
},
{timeseries: true}
)

const User = mongoose.model('User', userSchema);

export default User;