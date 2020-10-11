const express = require("express");
const app = express();

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/static/index.html");

    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log(ip);
});


app.listen(80, () => {
    console.log("DDOS Server started");
});