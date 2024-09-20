import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id}
            })
        } catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch(err) {

    }
}

const updateRoom = async (req, res, next) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.roomId, {$set: req.body}, { new: true })
        res.status(200).json(updatedRoom)
    } catch(err) {
        next(err)
    }   
}

const updateRoomAvailability = async (req, res, next) => {
    try{
        await Room.updateOne(
            {"roomNumbers._id": req.params.roomId},
            {
                $push: {
                    "roomNumbers.$.unavailableDates": { $each: req.body.dates }
                }
            }
        )
        res.status(200).json("Room status has been updated.")
    } catch(err) {
        next(err)
    }   
}

const deleteRoom = async (req, res, next) => {
    const roomId = req.params.roomId;
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(roomId)
        await Hotel.findByIdAndUpdate(hotelId, {
            $pull: {rooms: req.params.roomId}
        })
        res.status(200).json({"msg": "Room deleted!"})
    } catch(err) {
        next(err)
    }
}

const getRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.roomId)
        res.status(200).json(room)
    } catch(err) {
        next(err)
    }
}

const getAllRooms = async (req, res, next) => {

    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch(err) {
        next(err)
    }
}

export {createRoom, updateRoom, updateRoomAvailability, deleteRoom, getRoom, getAllRooms}