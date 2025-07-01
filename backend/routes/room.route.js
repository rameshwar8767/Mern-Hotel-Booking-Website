import express from "express"
import { protect } from "../middlewares/auth.middleware.js"

import upload from "../middlewares/upload.middleware.js"
import { addRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/room.controller.js"

const roomRouter = express.Router()

roomRouter.post('/',upload.array('images', 4), protect, addRoom)
roomRouter.get('/', getRooms)
roomRouter.get('/owner',protect,getOwnerRooms)
roomRouter.post('/toggle-availability',protect,toggleRoomAvailability)

export default roomRouter;