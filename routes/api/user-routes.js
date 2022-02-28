const router = require('express').Router
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser
} = require('../../controllers/user-controller')