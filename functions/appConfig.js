const express = require("express")
const session = require('express-session');
// const redis = require('redis');
// const redisStore = require('connect-redis')(session);
// const client  = redis.createClient();
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
    // store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl : 260}),
    saveUninitialized: false,
    resave: false,
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

function setAuth(req, boolToggle){
    req.session.authenticated = boolToggle;
    console.log({"setAuth": req.session})
}

module.exports = {app, setAuth}