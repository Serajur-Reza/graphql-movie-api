const mongoose = require("mongoose")

const Schema = mongoose.Schema

const movieSchema = Schema({
  title: {
    type: String,
    required: true,
  },

  cast: [
    {
      type: String,
      required: true,
    },
  ],

  director: {
    type: String,
    required: true,
  },

  release: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema)