const express = require("express");
const db = require("./db");
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const app = express();
const port = process.env.PORT;

const whiteList = ["https://tradia.online","https://tradia.online/","https://tradia.online/pages/login"]

db.connect();
app.use(morgan('dev'));
app.use(cors({
  origin: whiteList
}));
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const UserRoute = require("./routes/UserRoute.js");

app.use("/deepia/users", UserRoute);

app.listen(port, () =>{
    console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`);
})