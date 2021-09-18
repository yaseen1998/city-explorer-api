class Moviemodel {
  constructor(
    title,
    overview,
    average_votes,
    total_votes,
    image_url,
    popularity,
    released_on
  ) {
    this.title = title;
    this.overview = overview;
    this.average_votes = average_votes;
    this.total_votes = total_votes;
    this.image_url = "https://image.tmdb.org/t/p/w500" + image_url;
    this.popularity = popularity;
    this.released_on = released_on;
  }
}
module.exports = Moviemodel;
