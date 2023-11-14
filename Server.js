const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const authRoute = require("./routes/AuthRoute");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

mongoose
 .connect(MONGO_URL)
 .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
 })
 .catch((err) => {
    console.error("Error connection to mongo", err.reason);
 });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})
const corsOptions = {
    origin: ["http://localhost:5173"],
    allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
    method: ['GET', "POST"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/", authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})