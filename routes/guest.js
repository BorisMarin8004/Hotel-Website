const router = require('express').Router();
const appConfig = require('../functions/appConfig')
const db = require("../functions/db")

// Display Login Form
router.get('/login', (req, res) => {
    req.session.authenticated = false
    req.session.guestId = null
    res.render("./guest/login");
});

// Display Edit Profile Form
router.get('/update', async (req, res) => {
    let guestId = req.session.guestId;
    let sql = `SELECT guestId, firstName, lastName, cardInfo FROM guests where guestId=${guestId}`;
    let rows = await db.executeSQL(sql);

    res.render("./guest/profile", {"user":rows[0]});
});

router.get("/create", (req, res) =>{
    res.redirect("/guest/login")
});

// Submit Login info
router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username === appConfig.adminUsername && password === appConfig.adminPassword){
        req.session.authenticated = true
        res.render("./admin/admin")
    }

    let error = "ERROR: Incorrect password";

    let sql = "SELECT * FROM guests WHERE username = ?";
    let params = [username];
    let rows = await db.executeSQL(sql, params);

    if (rows.length > 0){
       if (password === rows[0].password){
        req.session.authenticated = true
        req.session.guestId = rows[0].guestId;
        res.render("index");
        } else {
            res.render("./guest/login", {"error":error});
        }
    } else {
        error = "ERROR: Username not found";
        res.render("./guest/login", {"error":error});
    }

    
});

// Submit new account info
router.post('/create', async (req, res) => {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let username = req.body.username;
    let password = req.body.password;

    let sql = "INSERT INTO guests (firstName, lastName, username, password) VALUES (?, ?, ?, ?)";
    let params = [fName, lName, username, password];

    if (fName.length <= 0 || lName.length <= 0 || username.length <= 0 || password.length <= 0){
        res.render("./guest/login", {"error":"ERROR: All fields must be filled!"});
    } else{
        let sqlCheck = "SELECT guestId FROM guests WHERE username=?";
        let rows = await db.executeSQL(sqlCheck, [username]);
        if (rows.length !== 0){
            res.render("./guest/login", {"error":`ERROR: The username ${username} is already taken!`});
        } else{
            let rows = await db.executeSQL(sql, params);
            res.render("./guest/login", {"error":`Account ${username} created successfully!`});
        }
        
    }
});

// Submit edited profile info
router.post('/update', async (req, res) => {
    let guestId = req.body.guestId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let cardInfo = req.body.cardInfo;

    console.log("GUESTID: " + guestId);

    let sql = `UPDATE guests
               SET firstName = ?,
               lastName = ?,
               cardInfo = ?
               WHERE guestId = ${guestId}`;
    let params = [firstName, lastName, cardInfo];
    let rows = await db.executeSQL(sql, params);

    
    res.redirect('/guest/update');
});


module.exports = router;