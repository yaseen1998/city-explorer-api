"use strict";
const express=require('express');
const app=express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weatherData=require('./data/weather.json');
const PORT=process.env.PORT;

app.get('/weather',(req,res)=>{
    let lat=Number(req.query.lat);
    let lon=Number(req.query.lon);
    console.log(weatherData.lon);
    let searchQuery
    if (lat&&lon){
        searchQuery =weatherData.find(element=>element.lat === lat && element.lon === lon)
            console.log(lat);
        ;}else{
                res.status(500).send("please provide correct query params");
            }
   
    let foreCast=searchQuery.data.map(item=>{
                    return {
                        date:item.datetime,
                        description:item.weather.description
                    }
                })
                let result = {
                    city_name:searchQuery.city_name,
                    foreCast:foreCast,
                    
                    
                }

                    res.status(200).json(foreCast);

})
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}` )
});