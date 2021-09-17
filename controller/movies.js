"use strict";
const Moviemodel = require("../model/movie.model");
const cache = require("../cache/cache");

const axios = require("axios");

let movieController = async (req, res) => {
  let Moviename = req.query.query;
  const moviekey = "movie name :" + Moviename;
  let urlmovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${Moviename}`;
  if (
    cache.data != undefined &&
    cache.key === moviekey &&
    Date.now() - cache.timestamp < 50000
  ) {
    res.json(cache.data);
  } else {
    cache.timestamp = Date.now();
    cache.data = await axios
      .get(urlmovie)
      .then((response) => parseWeather(response.data));
    cache.key = moviekey;
    res.status(200).json(cache.data);
  }

  return cache.data;
};
function parseWeather(movieData) {
  try {
    let movieSummaries = movieData.results.map((item) => {
      return new Moviemodel(
        item.title,
        item.overview,
        item.vote_average,
        item.vote_count,
        item.poster_path,
        item.popularity,
        item.release_date
      );
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}
module.exports = movieController;
