const Movie = require('./../../models/movie')
const { transformMovies } = require("./helpers")

module.exports = {
  movies: async () => {
    try {
      const movies = await Movie.find();
      return movies.map((movie) => transformMovies(movie));
    } catch (err) {
      console.log(err.message);
    }
  },
  createMovie: async (args) => {
    const movie = new Movie({
      title: args.movieInput.title,
      cast: args.movieInput.cast,
      director: args.movieInput.director,
      release: args.movieInput.release,
    });
    console.log(movie);

    try {
      const result = await movie.save();
      return transformMovies(movie);
    } catch (err) {
      console.log(err.message);
    }
  },

  deleteMovie: async(args)=>{
    try{
      const movie = await Movie.findById( args.movieId )
      const result = transformMovies(movie)
      await Movie.deleteOne({ _id: args.movieId })
      return result
    }

    catch(err){
      console.log(err.message)
    }
  }
};