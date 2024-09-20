import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

const createHotel = async (req, res) => {

    const newHotel = new Hotel(req.body) //init model object with hotel data

    try{
        const savedHotel = await newHotel.save() //save the hotel data in mongoDB
        res.status(200).json(savedHotel)
    } catch(err) {
        res.status(500).json(err)
    }
}

const updateHotel = async (req, res) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch(err) {
        res.status(500).json(err)
    }
}

const deleteHotel = async (req, res) => {
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel deleted!")
    } catch(err) {
        res.status(500).json(err)
    }
}

const getHotel = async (req, res) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch(err) {
        res.status(500).json(err)
    }
}

const getAllHotels = async (req, res, next) => {
    const {minPrice, maxPrice, minRat, maxRat, limit, ...others} = req.query
    try{
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: {$gte: minPrice || 1, $lte: maxPrice || Number.MAX_VALUE},
            rating: {$gte: minRat || 1, $lte: maxRat || 5}
        }).limit(limit || Number.MAX_VALUE)
        res.status(200).json(hotels)
    } catch(err) {
        res.status(500).json(err)
    }
}

const countByPlace = async (req, res, next) => {
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(list)  
    } catch (err) {
        next(err)
    }
}

const countByType = async (req, res, next) => {
    const types = req.query.types.split(',')
    try {
        const list = await Promise.all(types.map(type => {
            return Hotel.countDocuments({type: type})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

const getHotelRooms = async (req, res, next) => {

    const hotelId = req.params.hotelId;
    try {
        const hotel = await Hotel.findOne({_id: hotelId})
        const roomIds = hotel.rooms
        console.log(roomIds)
        const rooms = await Promise.all(          //takes array of promises as arg
            roomIds.map((id) => {                   //returns single promise
               return Room.findOne({_id: id})      //resolves when all promises resolve
            })
        )  

        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }

}

export {createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, getHotelRooms, countByPlace, countByType}