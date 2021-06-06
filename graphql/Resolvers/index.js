const movieResolvers = require('./Movie')
const directorResolvers = require('./Director')
const performerResolvers = require('./Performer')

module.exports = {
  ...movieResolvers,
  ...directorResolvers,
  ...performerResolvers,
};