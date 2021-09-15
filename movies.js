'use strict'

const axios = require("axios");

let movieController = async (req, res) => {;
    let Moviename = req.query.query
    let urlmovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${Moviename}`;
    let movieResponse = await axios.get(urlmovie);

    let MovieData = movieResponse.data.results.map((item)=>{
        return new movieModel (item.title, item.overview,item.vote_average,item.vote_count,item.poster_path,item.popularity,item.release_date);
    })
    res.status(200).json(MovieData);
}
class movieModel {
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
  module.exports=movieController;
