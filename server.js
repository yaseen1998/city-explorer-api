"use strict";
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.status(200).json({"message":"I'm working"})
})

let handleWeather = async (req, res) => {
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  if (lat && lon) {
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    let axiosResponse = await axios.get(url);
    let weatherData = axiosResponse.data;
    let cleanedData = weatherData.data.map((item) => {
      return new ForeCast(item.datetime, item.weather.description);
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

app.get("/weather", handleWeather);



// Model
class ForeCast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

let handleMovie = async (req, res) => {;
    let Moviename = req.query.query
    let urlmovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${Moviename}`;
    let movieResponse = await axios.get(urlmovie);

    let MovieData = movieResponse.data.results.map((item)=>{
        return new MOvieList (item.title, item.overview,item.vote_average,item.vote_count,item.poster_path,item.popularity,item.release_date);
    })
    res.status(200).json(MovieData);
}

app.get("/movie", handleMovie);

class MOvieList {
    constructor(title,overview,average_votes,total_votes,image_url,popularity,released_on) {
        this.title=title;
        this.overview=overview;
        this.average_votes=average_votes;
        this.total_votes=total_votes;
        this.image_url='https://image.tmdb.org/t/p/w500'+image_url;
        this.popularity=popularity;
        this.released_on=released_on;
    }
  }
  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
//   app.get('/movie',(req,res)=>{
//     res.status(200).json({"message":"I'm working"})
// })
// "use strict";
// const express=require('express');
// const app=express();
// const cors = require('cors');
// app.use(cors());
// require('dotenv').config();
// const weatherData=require('./data/weather.json');
// const PORT=process.env.PORT;

// app.get('/weather',(req,res)=>{
//     let lat=Number(req.query.lat);
//     let lon=Number(req.query.lon);
//     let searchQuery
//     if (lat&&lon){
//         searchQuery =weatherData.find(element=>element.lat === lat && element.lon === lon)
//             console.log(lat);
//             let foreCast=searchQuery.data.map(item=>{
//                 return {
//                     date:item.datetime,
//                     description:item.weather.description
//                 }
//             })
//             let result = {
//                 city_name:searchQuery.city_name,
//                 foreCast:foreCast,

//             }

//                 res.status(200).json(result);
//         ;}else{
//                 res.status(500).send("please provide correct query params");
//             }

// })
// app.listen(PORT, ()=>{
//     console.log(`Listening on port ${PORT}` )
// });
