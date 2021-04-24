const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("From reservation.js");
});

module.exports = router;