const router = require('express').Router();

// router.get('/', (req, res) => {
//     res.send("From reservation.js");
// });

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
    // let sql = "INSERT INTO q_authors (firstName, lastName, dob, dod, sex, profession, country, portrait, biography) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
    let params = [fName, lName, inDate, outDate, roomType];
    //let rows = await executeSQL(sql, params);
    res.render("makeReservation", {"message": "Reservation made!"});
});

module.exports = router;