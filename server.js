const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./graph/schema');
const resolvers = require('./graph/resolvers');
const mapContext = require('./utils/mapContext');

const app = express();

app.use(bodyParser.json());

mongoose
  .connect('mongodb://mongo:27017/todo', {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: mapContext,
});

apolloServer.applyMiddleware({ app });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
  console.log(`GraphQL is available at ${apolloServer.graphqlPath}`);
});
