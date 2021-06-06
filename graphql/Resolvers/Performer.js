const Performer = require("../../models/performer");
const Movie = require("../../models/movie");

module.exports = {
  performers: async () => {
    try {
      const performers = await Performer.find().populate('movies');
      console.log(performers.movies);
      return performers.map((performer) => {
        console.log(performer.movies);
        return {
          ...performer._doc,
          _id: performer.id,
          name: performer.name,
          movies: performer.movies,
        };
      });
    } catch (err) {
      console.log(err.message);
    }

    // return Performer.find().populate('movies').then(performers=>{
    //   return performers.map(performer =>{
    //       return {
    //         ...performer._doc,
    //         _id: performer.id,
    //         name: performer.name,
    //         movies: performer.movies,
    //       };
    //   })
    // }).catch(err =>{
    //   console.log(err.message)
    // })
  },

  createPerformer: async (args) => {
    try {
      const array = [];
      const searchedMovies = await Movie.find((err, data) => {
        if (err) {
          console.log("no data found");
          return;
        } else {
          data.forEach((movie) => {
            if (movie.cast.includes(args.performerInput.name)) {
              array.push(movie);
            }
          });
          console.log(array);
          return array;
        }
      }).populate("movies");

      const performer = new Performer({
        name: args.performerInput.name,
        movies: array,
      });
      const result = await performer.save();
      console.log("inside try: ", array);
      console.log("inside try: ", result);
      return {
        ...result._doc,
        _id: performer.id,
        name: performer.name,
        movies: performer.movies,
      };
    } catch (err) {
      console.log(err.message);
    }
  },
};
