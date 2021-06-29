const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')

const isAuth = require('./middleware/is-auth')

const graphQlSchema = require('./graphql/Schema/index')
const graphQlResolvers = require('./graphql/Resolvers/index')

const app = express()

app.use(bodyParser.json())
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.lu2mu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(()=>{
  app.listen(3000, () => {
    console.log("Connected");
  });
})
.catch(err =>{
  console.log(err.message)
})


