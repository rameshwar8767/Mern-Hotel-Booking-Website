import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getUserData,
  storeRecentSearchedCities,
  registerUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData); // GET /api/user
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);
userRouter.post("/register", registerUser); // ✅ POST /api/user/register

export default userRouter;
