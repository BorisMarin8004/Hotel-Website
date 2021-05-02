const express = require("express")

//Setup
const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'topsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Routers
const guestRouter = require('./routes/guest.js');
const infoRouter = require('./routes/info.js');
const reservationRouter = require('./routes/reservation.js');
app.use('/guest', guestRouter);
app.use('/info', infoRouter);
app.use('/reservation', reservationRouter);

app.get('/', (req, res) => {
    res.redirect("/info/")
})

app.listen(3000, () => {
    console.log("Server up")
})


