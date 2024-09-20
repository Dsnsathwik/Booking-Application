import User from "../models/User.js"
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const registerUser = async (req, res, next) => {
    
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        console.log(newUser)
        await newUser.save()
        return res.status(200).json({msg: "user has been created"})
    } catch(err) {
        next(err);
    }
}

const loginUser = async (req, res, next) => {
    
    try {
        const user = await User.findOne({username: req.body.username});
        console.log(user)
        if(!user) return next(createError(404, "User not found!"))

        const valid = await bcrypt.compare(req.body.password, user.password)
        if(!valid) return next(createError(404, "username or password not found!"))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)

        const {password, isAdmin, ...otherDetails} = user._doc
        return res.cookie('accessToken', token, {httpOnly: true}).status(200).json({msg: "User has been logged in", user: {...otherDetails}})
    } catch(err) {
        next(err);
    }
}

export {registerUser, loginUser}