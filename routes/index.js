const router = require('express').Router();

const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thoughts-routes')

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes)



router.use((req, res)=>{
    res.status(404).send(`<h1> 404 error!`);
});

module.exports = router;