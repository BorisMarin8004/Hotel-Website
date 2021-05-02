const router = require('express').Router();
const db = require("../functions/db")

router.get('/', (req, res) => {
    res.send("From guest.js");
});

router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let error = "ERROR: Incorrect password";

    let sql = "SELECT * FROM guests WHERE username = ?";
    let params = [username];
    let rows = await db.executeSQL(sql, params);

    console.log(rows);

    if (rows.length <= 0){
        error = "ERROR: Username not found";
    }
    

    if (password === rows[0].password){
        res.send("success");
    } else {
        res.render("login", {"error":error});
    }
});

router.post('/create', async (req, res) => {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let username = req.body.username;
    let password = req.body.password;

    let sql = "INSERT INTO guests (firstName, lastName, username, password) VALUES (?, ?, ?, ?)";
    let params = [fName, lName, username, password];

    if (fName.length <= 0 || lName.length <= 0 || username.length <= 0 || password.length <= 0){
        res.render("login", {"error":"ERROR: All fields must be filled!"});
    } else{
        let sqlCheck = "SELECT guestId FROM guests WHERE username=?";
        let rows = await db.executeSQL(sqlCheck, [username]);
        if (rows.length !== 0){
            res.render("login", {"error":`ERROR: The username ${username} is already taken!`});
        } else{
            let rows = await db.executeSQL(sql, params);
            res.render("login", {"error":`Account ${username} created successfully!`});
        }
        
    }
    




    
});

module.exports = router;