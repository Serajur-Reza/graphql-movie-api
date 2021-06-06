const Movie = require('../../models/movie')

const movies = async(movieId) =>{
  try{
    const movie = await Movie.findById(movieId)
    return transformMovies(movie)
  }
  catch(err){
    console.log(err.message)
  }
}

const transformMovies = (movie) =>{
  return {
    ...movie._doc,
    _id: movie.id,
    title: movie.title,
    cast: movie.cast,
    director: movie.director,
    release: movie.release,
  };
}

module.exports = {
  transformMovies
}