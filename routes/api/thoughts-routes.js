const router = require('express').Router
const {
    createThought,
    addReaction,
    removeReaction,
    removeThought
} = require('../../controllers/thoughts-controller')

router
    .route('/:userId')
    .get(createThought)
    .delete(removeThought);

router
    .route('/:userId/:thoughtId')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;