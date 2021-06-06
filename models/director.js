const mongoose = require('mongoose')

const Schema = mongoose.Schema

const directorSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  // movies: [{
  //   // _id: {
  //   //   type: Schema.Types.ObjectId,
  //   //   ref: "Movie",
  //   //   required: true,
  //   // },

  //     type: String,

  //     required: true,

  // }],

  movies: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    title: {
      type: String,
      ref: "Movie",
      required: true,
    },
  }],
});

module.exports = mongoose.model("Director", directorSchema);