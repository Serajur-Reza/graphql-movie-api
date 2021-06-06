const { buildSchema } = require('graphql')

module.exports = buildSchema(`
      type Movie{
        _id: ID
        title: String!
        cast: [String!]!
        director: String!
        release: String!
      }

      type Director{
        _id: ID
        name: String!
        movies: [Movie!]!
      }

      type Performer{
        _id: ID
        name: String!
        movies: [Movie!]!
      }


      input MovieInput{
        title: String!
        cast: [String!]!
        director: String!
        release: String!
      }

      input DirectorInput{
        name: String!        
      }

      input PerformerInput{
        name: String!
      }

      input UserInput{
        email: String!
        password: String!
      }

      type RootQuery{
        movies: [Movie!]!
        directors: [Director!]!
        performers: [Performer!]!
        
      }

      type RootMutation{
        createMovie(movieInput: MovieInput): Movie!
        createDirector(directorInput: DirectorInput): Director!
        createPerformer(performerInput: PerformerInput): Performer!
        deleteMovie(movieId: ID!): Movie!
      }

      schema{
        query: RootQuery
        mutation: RootMutation
      }
    `);