const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require('http');

const coreRoutes = require("./src/apis/core");
const resultRoutes = require("./src/apis/result");
const authRoutes =  require("./src/apis/auth");
const messRoutes = require("./src/apis/mess");
const noticeRoutes = require("./src/apis/notice");
const eventRoutes = require("./src/apis/events");
const holidayRoutes = require("./src/apis/holiday")
const updateDataRoutes = require("./src/apis/update");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ["https://biasportal.vercel.app"],
    // origin: ["http://localhost:3000"],
    method: ["POST", "GET", "DELETE"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Adding Routes 

app.use("/", coreRoutes);
app.use("/result", resultRoutes);
app.use("/auth", authRoutes);
app.use("/mess", messRoutes);
app.use("/notices", noticeRoutes);
app.use("/events", eventRoutes);
app.use("/holidays", holidayRoutes);
app.use("/update", updateDataRoutes);

// Test

app.get("/", (req, res) => {
    //  res.render('index');
    res.send("Backend API is working");
});

server.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("App listening on port:", port);
    }
});
