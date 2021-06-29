const Director = require('../../models/director');
const Movie = require('../../models/movie');

module.exports = {
  directors: async () => {
    try {
      const directors = await Director.find().populate('movies');
      console.log(directors.movies)
      return directors.map((director) => {
        console.log(director.movies);
        return {
          ...director._doc,
          _id: director.id,
          name: director.name,
          movies: director.movies,
        };
      });
    } catch (err) {
      console.log(err.message);
    }
  },

  createDirector: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
    }

    try {
      const searchedMovies = await Movie.find({
        director: args.directorInput.name,
      }).populate('movies');
      
      const director = new Director({
        name: args.directorInput.name,
        movies: searchedMovies,
      });
      const result = await director.save();
      console.log("inside try: ", searchedMovies);
      console.log("inside try: ", result);
      return {
        ...result._doc,
        _id: director.id,
        name: director.name,
        movies: director.movies,
      };
    } catch (err) {
      console.log(err.message);
    }
  },
};