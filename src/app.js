const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || "development";

app.use(morgan('combined'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(`Listening on Port ${PORT} / at ${environment} Env `);
});

app.get("/ping", (req, res) => {
  res.send({ status: "Ok" });
});
// CORS ALL ACCESS
app.disable("x-powered-by");

require('./router')(app);

app.listen(PORT, () => {
  console.info(`[ApiServer] Listening on Port ${PORT} / at ${environment} Env`);
});

module.exports = app;