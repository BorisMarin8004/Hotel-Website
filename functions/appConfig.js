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
    expire: new Date(Date.now() + (30 * 1000)),
    guestId: null,
    authenticated: false
}));

const adminUsername = "admin"
const adminPassword = "admin"

async function getData(url){
    let response = await fetch(url);
    return await response.json();
}

app.use((req, res, next) => {
    console.log({"Session": req.session, "Path" : req.path, "Reg" : req.session.regenerate})
    if(!req.session.authenticated && req.path !== "/guest/login" && req.path !== "/guest/create"){
        res.redirect("/guest/login")
    }else{
        next();
    }
})

module.exports = {app, adminUsername, adminPassword, getData}