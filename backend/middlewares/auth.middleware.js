import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const auth = await req.auth?.(); // Safely call req.auth if available
    if (!auth?.userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const user = await User.findOne({ clerkId: auth.userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user; // Add user to req
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(500).json({ success: false, message: "Authentication failed" });
  }
};
