const router = require('express').Router();
const db = require("../functions/db")

//Reservation GET Route: load reservations page
router.get("/makeReservation", async (req, res) => {
    let sql = `SELECT firstName, lastName, cardInfo FROM guests WHERE guestId=${req.session.guestId}`
    let guestData = (await db.executeSQL(sql))[0]


    let startDate = req.query.start
    let endDate = req.query.end
    let roomType = req.query.type
    let freeRooms = "No date data"

    if (typeof startDate !== 'undefined' && typeof startDate !== 'undefined' && typeof startDate !== 'undefined'){
        sql = `SELECT rooms.roomId, type, price FROM rooms INNER JOIN reservations ON roomId.reservations=roomId.rooms
           WHERE (startDate <= ${startDate} AND endDate <= ${endDate}) 
           OR (startDate >= ${startDate} AND endDate >= ${endDate})`
        let freeRooms = (await db.executeSQL(sql))[0]
        console.log(startDate, endDate)
    }

    res.render("./reservation/makeReservation", {guestData, freeRooms});
});

router.get("/updateAvailabilityInfo", async (req, res) => {

})

// Reservation POST Route: get form data and insert into DB
router.post("/makeReservation", async (req, res) => {
    let fName = req.body.firstName
    let lName = req.body.lastName
    let inDate = req.body.inDate
    let outDate = req.body.outDate
    let roomType = req.body.type
    // Insert info into reservation db
    // let sql = "INSERT INTO reservations (startDate, endDate) VALUES (?, ?);"
    // let params = [inDate, outDate];
    // let rows = await db.executeSQL(sql, params);
    res.render("./reservation/makeReservation", {"message": "Reservation made!(Not actually)"});
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