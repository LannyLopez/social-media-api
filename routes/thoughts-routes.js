const router = require('express').Router();
const {
    createThought,
    addReaction,
    removeReaction,
    removeThought,
    getAllThoughts
} = require('../controllers/thoughts-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:thoughtId')
    .post(addReaction)
    .delete(removeThought);
router
.route('/;thoughtId/:reactionId')
.delete(removeReaction);

module.exports = router;