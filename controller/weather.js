"use strict";
const cache = require("../cache/cache");
const Weather = require("../model/weather.model");
const axios = require("axios");
let weatherController = async (req, res) => {
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  const key = "weather lat : " + lat + "weather lon : " + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  if (
    cache.data != undefined &&
    cache.key === key &&
    Date.now() - cache.timestamp < 50000
  ) {
    res.json(cache.data);
  } else {
    cache.timestamp = Date.now();
    cache.data = await axios
      .get(url)
      .then((response) => parseWeather(response.data));
    cache.key = key;
    res.status(200).json(cache.data);
  }

  return cache.data;
};
function parseWeather(weatherData) {
  try {
    let weatherSummaries = weatherData.data.map((item) => {
      return new Weather(item.datetime, item.weather.description);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}
module.exports = weatherController;
