const express = require("express");
const db = require("./db");
const morgan = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));

db.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const UserRoute = require("./routes/UserRoute.js");

app.use("/deepia/users", UserRoute);

app.listen(port, () =>{
    console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`);
})