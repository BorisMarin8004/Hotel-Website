const appConfig = require("./functions/appConfig")

let app = appConfig.app

// Routers
const adminRouter = require('./routes/admin.js')
const guestRouter = require('./routes/guest.js');
const infoRouter = require('./routes/info.js');
const reservationRouter = require('./routes/reservation.js');
app.use('/admin', adminRouter);
app.use('/guest', guestRouter);
app.use('/info', infoRouter);
app.use('/reservation', reservationRouter);

app.get('/', (req, res) => {
    res.redirect("/info/")
})

app.listen(3000, () => {
    console.log("Server up")
})
