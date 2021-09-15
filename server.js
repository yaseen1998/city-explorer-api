"use strict";
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;
const weatherController =require("./weather");
const movieController = require("./movies")

app.get('/',(req,res)=>{
    res.status(200).json({"message":"I'm working"})
})


app.get("/weather", weatherController);





app.get("/movie",movieController);

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
