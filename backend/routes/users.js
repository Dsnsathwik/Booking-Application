import express from 'express'
import { verifyAdmin, verifyJwt, verifyUser } from '../utils/verifyToken.js'
import {updateUser, deleteUser, getUser, getAllUsers} from '../controllers/users.js'

const router = express.Router()


// UPDATE USER
router.put('/:id', verifyUser, updateUser)

// DELETE USER
router.delete('/:id', verifyUser, deleteUser)

// GET USER
router.get('/:id', verifyUser, getUser)

// GET ALL USERS
router.get('/', verifyAdmin, getAllUsers)


export default router