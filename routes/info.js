const db = require("../functions/db")
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render("index.js");
});

router.get('/roomTypes', async (req, res) => {
    let sql = 'SELECT * FROM Rooms'
    let rooms = await db.executeSQL(sql);
    res.render("roomTypes.ejs", {"rooms": rooms})
})

module.exports = router;