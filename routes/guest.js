const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send("From guest.js");
});

module.exports = routes;