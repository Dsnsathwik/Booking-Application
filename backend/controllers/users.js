import User from '../models/User.js'

const updateUser = async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)
    } catch(err) {
        res.status(500).json(err)
    }
}

const deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted!")
    } catch(err) {
        res.status(500).json(err)
    }
}

const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
}

const getAllUsers = async (req, res, next) => {

    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json(err)
    }
}

export {updateUser, deleteUser, getUser, getAllUsers}