
import UserModel from "../models/user.model.js"; // adjust path as needed
// Get /api/user
// controllers/user.controller.js



// POST /api/user/register

export const registerUser = async (req, res) => {
    try {
        const { id, username, email, image_url } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ clerkId: id });
        if (existingUser) {
            return res.status(200).json({ success: true, message: "User already exists" });
        }

        const newUser = await UserModel.create({
            clerkId: id,
            email,
            username,
            profileImage: image_url,
            role: "user", // default
            recentSearchedCities: [],
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("registerUser error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getUserData = async (req, res) => {
    try {
        const { userId } = await req.auth(); // ✅ use req.auth() properly

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = await UserModel.findOne({ clerkId: userId }); // use your DB field

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            role: user.role,
            recentSearchedCities: user.recentSearchedCities || [],
        });
    } catch (error) {
        console.error("getUserData error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//Store User Recent Searched Cities

export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { userId } = await req.auth();
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { recentSearchedCity } = req.body;
        if (!recentSearchedCity) {
            return res.status(400).json({ success: false, message: "City is required" });
        }

        const user = await UserModel.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.recentSearchedCities = [
            ...(user.recentSearchedCities || []),
            recentSearchedCity,
        ].slice(-3);

        await user.save();
        res.json({ success: true, message: "City added" });
    } catch (error) {
        console.error("storeRecentSearchedCities error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
