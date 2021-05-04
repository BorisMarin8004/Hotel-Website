const express = require("express")
const cookieSession = require('cookie-session');

//Setup
const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1)
app.use(cookieSession({
    name: 'session',
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    expires: new Date(Date.now() + (30 * 3000)),
    guestId: null,
    authenticated: false
}));

app.use((req, res, next) => {
    console.log({"Session": req.session, "Path" : req.path})
    if(!req.session.authenticated && req.path !== "/guest/login"){
        res.redirect("/guest/login")
    }else{
        next();
    }
})

module.exports = {app}