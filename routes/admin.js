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

router.get('/room/update/', async (req, res) =>{
    let roomId = req.query.roomId;
    console.log(roomId);
    let sql = 'SELECT * FROM rooms WHERE roomId = ?';
    let params = [roomId];
    let rows = await db.executeSQL(sql, params);
    console.log(rows);
    res.render('roomUpdate', {"room":rows[0]});
})

router.post('/room/update/', async (req, res)=>{
    console.log("In Post");
    let roomId = req.body.roomId;
    let type = req.body.type;
    let price = req.body.price;
    let image = req.body.image;
    let descript = req.body.descript;

    let sql = 'UPDATE rooms SET type = ?, price = ?, image = ?, description = ? WHERE roomId = ${roomId}';
    let params = [type, price, image, descript];
    let rows = await db.executeSQL(sql, params);
    console.log("ROWS: "+ rows);
    console.log("RoomID: " + roomId);
    //res.redirect(`/rooms/update?roomId=${roomId}`);

    let sql2 = 'SELECT * FROM rooms WHERE roomId = ?';
    let params2 = [roomId];
    let rows2 = await db.executeSQL(sql2, params2);
    console.log(rows);
    res.render('roomUpdate', {"room":rows2[0]});
})

router.get('/reservations/', async (req, res) => {
    let sql = 'SELECT * FROM reservations'
    let table = await db.executeSQL(sql);
    res.render('admin', {"keyWord":"reservations", table})
})

module.exports = router;