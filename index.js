const express = require("express");
const db = require("./db");
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const app = express();
const port = process.env.PORT;

var corsOptions = {
    origin: "https://tradia.online/"
  };
  app.use(cors(corsOptions));
  app.use(bodyParser.json({
    limit: '50mb'
  }))

  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
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