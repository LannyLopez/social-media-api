const router = require('express').Router()
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser
} = require('../controllers/user-controller')

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;