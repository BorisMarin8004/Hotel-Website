const router = require('express').Router();
const db = require("../functions/db")

async function getFreeRooms (startDate, endDate){
    console.log(startDate, endDate)
    let sql = `SELECT rooms.roomId, type, price FROM rooms INNER JOIN reservations
           WHERE (startDate <= ${startDate} AND endDate <= ${endDate}) 
           OR (startDate >= ${startDate} AND endDate >= ${endDate})`
    return await db.executeSQL(sql)
}

//Reservation GET Route: load reservations page
router.get("/makeReservation", async (req, res) => {
    let sql = `SELECT firstName, lastName, cardInfo FROM guests WHERE guestId=${req.session.guestId}`
    let guestData = (await db.executeSQL(sql))[0]
    res.render("./reservation/makeReservation", {guestData});
});

router.get("/updateAvailabilityInfo", async (req, res) => {
    let startDate = req.query.start
    let endDate = req.query.end
    let freeRooms = "No date data"

    if (typeof startDate !== 'undefined' && typeof startDate !== 'undefined' && typeof startDate !== 'undefined'){
        freeRooms = await getFreeRooms(startDate, endDate)
    }
    res.send(freeRooms)
})

// Reservation POST Route: get form data and insert into DB
router.post("/makeReservation", async (req, res) => {
    let fName = req.body.firstName
    let lName = req.body.lastName
    let inDate = req.body.inDate
    let outDate = req.body.outDate
    let roomType = req.body.type
    // Insert info into reservation db

    let rooms = getFreeRooms()

    console.log({"guestId": req.session.guestId, "RoomType": roomType})
    let sql = "INSERT INTO reservations (startDate, endDate) VALUES (?, ?);"
    let params = [inDate, outDate];
    let rows = await db.executeSQL(sql, params);
    res.redirect("/reservation/makeReservation");
});

router.get("/viewReservations", async function(req, res){
    let guestId = req.session.guestId;
    let sql = `SELECT resId, reservations.roomId, startDate, endDate, price, type, description, image
               FROM rooms JOIN reservations
               ON rooms.roomId = reservations.roomId
               WHERE guestId = ${guestId}`;
    let rows = await db.executeSQL(sql);
    res.render("./reservation/viewReservations", {"reservations":rows});
});

router.post("/viewReservations", async function(req, res){
    let resId = req.body.resId;
    let sql = `DELETE FROM reservations WHERE resId = ${resId}`;
    await db.executeSQL(sql);
    res.redirect("/reservation/viewReservations");
});



module.exports = router;