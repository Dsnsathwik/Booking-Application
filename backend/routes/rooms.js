import express from 'express'
import {createRoom, updateRoom, updateRoomAvailability, deleteRoom, getRoom, getAllRooms} from '../controllers/room.js'
import { verifyAdmin, verifyJwt, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// CREATE ROOM
router.post('/:hotelId', verifyAdmin, createRoom)

// UPDATE ROOM
router.put('/:roomId', verifyAdmin, updateRoom)
router.put('/availability/:roomId', updateRoomAvailability)

// DELETE ROOM
router.delete('/:roomId/:hotelId', verifyAdmin, deleteRoom)

// GET ROOM
router.get('/:roomId', getRoom)

// GET ALL HROOM
router.get('/', getAllRooms)


export default router
