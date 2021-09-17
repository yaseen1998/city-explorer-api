"use strict";
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT;
const weatherController = require("./controller/weather");
const movieController = require("./controller/movies");

app.get("/", (req, res) => {
  res.status(200).json({ message: "I'm working" });
});

app.get("/weather", weatherController);

app.get("/movie", movieController);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
