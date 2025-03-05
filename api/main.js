require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");
const { error } = require("console");

let app = express();
const port = 3000;
const apiKey = process.env.API_KEY;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/pages"));

app.use("/style", express.static(path.join(__dirname, "../client/style")));

app.get("/", (req, res) => {
  res.render("main-page");
});

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`;

  try {
    const response = await axios.get(url);
    const result = response.data;
    res.render("city-weather", { weather: result });
  } catch (error) {
    res.send(`${error}`);
  }
});

app.get("/weather/", async (req, res) => {
  try {
    const ipResponse = await axios.get("https://ipapi.co/json/");
    const city = ipResponse.data.city || "Mykolaiv";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`;
    const response = await axios.get(url);
    const result = response.data;
    res.render("your-city-weather", { weather: result });
  } catch (err) {
    res.send(`${err}`);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
