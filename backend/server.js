const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require('http');

// const { initiateSocket } = require("./src/core/socket");

// const coreRoutes = require("./src/apis/core");
// const marksRoutes = require("./src/apis/marks");
// const authRoutes =  require("./src/apis/auth");
// const messRoutes = require("./src/apis/mess");
// const noticeRoutes = require("./src/apis/notice");
// const eventRoutes = require("./src/apis/events");
// const holidayRoutes = require("./src/apis/holiday")
// const updateDataRoutes = require("./src/apis/update");

const app = express();
// app.use("/api", server);

// const server = require("./server.js");
// app.use("/api", server);
const port = process.env.PORT || 5000;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Adding Routes 

// app.use("/", coreRoutes);
// app.use("/marks", marksRoutes);
// app.use("/auth", authRoutes);
// app.use("/mess", messRoutes);
// app.use("/notices", noticeRoutes);
// app.use("/events", eventRoutes);
// app.use("/holidays", holidayRoutes);
// app.use("/update", updateDataRoutes);

// Initialize WebSocket

// initiateSocket(server);

// Test

app.get("/", (req, res) => {
    res.send("Backend API is working");
  });
app.listen(port, (err) => {
    if (err) {
      console.error("Error starting server:", err);
    } else {
      console.log("App listening on port:", port);
    }
});

// module.exports = server;
