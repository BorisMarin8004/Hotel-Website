const db = require("../functions/db")
const router = require('express').Router()

router.get('/', (req, res) => {
    res.render("index")
});

router.get('/roomTypes', async (req, res) => {
    let sql = 'SELECT * FROM Rooms'
    let rooms = await db.executeSQL(sql);
    res.render("roomTypes", {"rooms": rooms})
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.get('/events', async (req, res) => {
    // let sql = 'SELECT * FROM Events'
    // let events = await db.executeSQL(sql);
    let events = null
    res.render("events", {"events": events})
})

module.exports = router