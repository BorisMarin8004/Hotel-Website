const express = require("express")

//Setup
const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));

// Routers
const guestRouter = require('./routes/guest.js');
const infoRouter = require('./routes/info.js');
const reservationRouter = require('./routes/reservation.js');
app.use('/guest', guestRouter);
app.use('/info', infoRouter);
app.use('/reservation', reservationRouter);

app.get('/', (req, res) => {
    res.send("Root page")
})

app.listen(3000, () => {
    console.log("Server up")
})


