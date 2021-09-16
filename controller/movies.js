'use strict'
const Moviemodel=require("../model/movie.model");

const axios = require("axios");

let movieController = async (req, res) => {;
    let Moviename = req.query.query
    let urlmovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${Moviename}`;
    let movieResponse = await axios.get(urlmovie);

    let MovieData = movieResponse.data.results.map((item)=>{
        return new Moviemodel (item.title, item.overview,item.vote_average,item.vote_count,item.poster_path,item.popularity,item.release_date);
    })
    res.status(200).json(MovieData);
}

  module.exports=movieController;
