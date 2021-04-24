const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("From guest.js");
});

module.exports = router;