const router = require('express').Router();
const db = require("../functions/db")

router.get('/data/', (req, res) => {
    res.render('admin')
})

router.get('/guests/', async (req, res) => {
    let sql = 'SELECT * FROM guests'
    let table = await db.executeSQL(sql);
    res.render('admin', {"keyWord":"guests", table})
})

router.get('/rooms/', async (req, res) => {
    let sql = 'SELECT * FROM rooms'
    let table = await db.executeSQL(sql);
    res.render('admin', {"keyWord":"rooms", table})
})

router.get('/reservations/', async (req, res) => {
    let sql = 'SELECT * FROM reservations'
    let table = await db.executeSQL(sql);
    res.render('admin', {"keyWord":"reservations", table})
})

module.exports = router;