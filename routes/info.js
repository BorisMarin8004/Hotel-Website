const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("From info.js");
});

module.exports = router;