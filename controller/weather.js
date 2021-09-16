"use strict";
const Weathermodel=require("../model/weather.model");
const axios = require("axios");

let weatherController= async (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    if (lat && lon) {
      let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
      let axiosResponse = await axios.get(url);
      let weatherData = axiosResponse.data;
      let cleanedData = weatherData.data.map((item) => {
        return new Weathermodel(item.datetime, item.weather.description);
      });
      let result = {
        city_name: weatherData.city_name,
        foreCast: cleanedData,
      };
      res.status(200).json(result);
    } else {
        
      res.status(500).send("please provide correct query params");
    }
  };
  

module.exports=weatherController;