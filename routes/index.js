const router = require('express').Router();




router.use((req, res)=>{
    res.status(404).send(`<h1> 404 error!`);
});

module.exports = router;