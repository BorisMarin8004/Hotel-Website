const router = require('express').Router();
const db = require("../functions/db")

router.get('/data/', (req, res) => {
    res.render('admin')
})

module.exports = router;