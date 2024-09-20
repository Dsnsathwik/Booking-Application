import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.js'
import hotelRouter from './routes/hotels.js'
import roomRouter from './routes/rooms.js'
import userRouter from './routes/users.js'
import checkoutRouter from './routes/create-checkout-session.js'


const app = express()
const PORT = 4000
dotenv.config()


// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/hotel", hotelRouter)
app.use("/api/room", roomRouter)
app.use("/api/user", userRouter)
app.use("/api/create-checkout-session", checkoutRouter)


// Error handler
app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || 'Something went wrong!'
    return res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMessage,
      stack: err.stack
    })
})





const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB')
      } catch (error) {
        throw error
      }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})


app.listen(PORT, async () => {
    await connectDB()
    console.log(`Listening on PORT - ${PORT}`)
})