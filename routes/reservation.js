const router = require('express').Router();
const db = require("../functions/db")

//Reservation GET Route: load reservations page
router.get("/", async function(req, res){
    res.render("makeReservation");
});

// Reservation POST Route: get form data and insert into DB
router.post("/makeReservation", async function(req, res){
    let fName = req.body.firstName
    let lName = req.body.lastName
    let inDate = req.body.inDate
    let outDate = req.body.outDate
    let roomType = req.body.type
    // Insert info into reservation db
    // let sql = "INSERT INTO q_authors (startDate, endDate) VALUES (?, ?);"
    // let params = [inDate, outDate];
    // let rows = await db.executeSQL(sql, params);
    res.render("makeReservation", {"message": "Reservation made!(Not actually)"});
});

module.exports = router;