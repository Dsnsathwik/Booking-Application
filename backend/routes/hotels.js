import express from 'express'
import {createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, getHotelRooms, countByPlace, countByType} from '../controllers/hotels.js'
import { verifyAdmin, verifyJwt, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// CREATE HOTEL
router.post('/', verifyAdmin, createHotel)

// UPDATE HOTEL
router.put('/:id', verifyAdmin, updateHotel)

// DELETE HOTEL
router.delete('/:id', verifyAdmin, deleteHotel)

// GET HOTEL
router.get('/find/:id', getHotel)

// GET ALL HOTELS
router.get('/find', getAllHotels)

// GET HOTEL COUNTS
router.get('/countByPlace', countByPlace)
router.get('/countByType', countByType)
router.get('/rooms/:hotelId', getHotelRooms)



export default router
