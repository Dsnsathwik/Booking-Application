import express from "express"
import Stripe from 'stripe'
import dotenv from 'dotenv' 
dotenv.config()

const router = express.Router()
const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`)

router.post('/', async (req, res) => {
    const {hotels} = req.body;
    
    // lineItems - array of objects only
    const lineItems = hotels.map((hotel) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: hotel.name,
                images: hotel.photos, // Ensure this is an array of valid image URLs
            },
            unit_amount: hotel.price * 100, // Convert the price to cents
        },
        quantity: 1
    }));
    
    
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/checkout-success",
        cancel_url: "http://localhost:3000/checkout-failure"
    })

    res.json({id: session.id})
})

export default router