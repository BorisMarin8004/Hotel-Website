const express = require("express")
const mysql = require('mysql');

//Setup
const app = express()
const pool = dbConnection();
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


app.get("/", (req, res) => {
    res.send("Main page")
})


// Functions
async function executeSQL(sql, params){
    return new Promise (function (resolve, reject) {
        pool.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
} // executeSQL


function dbConnection(){

    const pool  = mysql.createPool({
        connectionLimit: 10,
        host: "qz8si2yulh3i7gl3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "yo6stpfpuea7xelv",
        password: "ixza1jduzcsx7bfv",
        database: "jhgdj5vjfmu4x4yk"

    });

    return pool;

} // dbConnection

app.listen(3000, () => {
    console.log("Server up")
})

