import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyJwt = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token) return next(createError(401, "You are not Authenticated!"))

    jwt.verify(token, process.env.JWT, (err, user) => { //id, isAdmin will be stored in user
        if(err) return next(createError(403, "Invalid Token!"))
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyJwt(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin)
            next()
        else return next(createError(403, "You are not Authorized!"))
    }) 
}

export const verifyAdmin = (req, res, next) => {
    verifyJwt(req, res, next, () => {
        if(req.user.isAdmin)
            next()
        else return next(createError(403, "You are not Authorized!"))
    }) 
}