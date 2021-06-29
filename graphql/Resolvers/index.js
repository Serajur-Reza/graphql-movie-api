const movieResolvers = require('./Movie')
const directorResolvers = require('./Director')
const performerResolvers = require('./Performer')
const auth = require('./auth')

module.exports = {
  ...auth,
  ...movieResolvers,
  ...directorResolvers,
  ...performerResolvers,
};