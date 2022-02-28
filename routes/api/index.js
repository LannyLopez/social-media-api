const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoute)

module.exports = router;