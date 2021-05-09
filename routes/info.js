const db = require("../functions/db")
const router = require('express').Router()

router.get('/', (req, res) => {
    console.log(req.route.path)
    console.log({"infoRoot": req.session})
    res.render("index")
});

router.get('/roomTypes', async (req, res) => {
    let sql = 'SELECT * FROM rooms GROUP BY type'
    let rooms = await db.executeSQL(sql);
    console.log(rooms)
    res.render("./info/roomTypes", {"rooms": rooms})
})

router.get('/contact', (req, res) => {
    res.render('./info/contact')
})

router.get('/events', async (req, res) => {
    // let sql = 'SELECT * FROM Events'
    // let events = await db.executeSQL(sql);
    let events = null
    res.render("./info/events", {"events": events})
})

router.get('/diningAndAmenities', (req, res) => {
    res.render('./info/diningAndAmenities')
})

router.get('/specialDeals', (req, res) => {
    res.render('./info/specialDeals')
})

module.exports = router